---
title: Make main() great again
date: 2020-03-01
icon: ":crown:"
twitter_url: https://twitter.com/atipugin/status/1234207279173509123
---

Сегодня поговорим про `main`. Поскольку это отправная точка любого нашего Go-приложения, мы хотим иметь возможность удобно тестировать происходящее там.

Представим код:

```go
func main() {
	fmt.Println("Hello, world")
}
```

Даже для такого простого примера мы не можем взять и написать тест, проверяющий его корректность. Всё из-за того, что `main` не принимает и не возвращает никаких аргументов, и поделать с этим ничего нельзя - сигнатуру поменять мы не можем.

Но решение есть. Мы можем добавить новую функцию-делегат, перенести туда всю нашу логику, а в `main` просто вызвать её:

```go
func main() {
	if err := realMain(os.Stdin, os.Stdout, os.Args); err != nil {
		log.Fatal(err)
	}
}

func realMain(in io.Reader, out io.Writer, args []string) error {
	fmt.Fprintln(out, "Hello, world!")

	return nil
}
```

Наша новая функция `realMain` принимает на вход стандартный ввод/вывод (`os.Stdin`, `os.Stdout`), а также аргументы командной строки (`os.Args`). В качестве типов данных используются максимально простые интерфейсы `io.Reader` и `io.Writer`. На выходе `realMain` может вернуть ошибку, если что-то пошло не так.

Здесь важно обратить внимание на то, что теперь мы не должны использовать стандартный ввод/вывод напрямую. Именно поэтому мы заменили `fmt.Println(...)`, на `fmt.Fprintln(out, ...)`.

Такую конструкцию мы уже можем без проблем протестировать:

```go
func TestRealMain(t *testing.T) {
	// Вместо реального ввода/вывода мы будем использовать bytes.Buffer
	var in, out bytes.Buffer
	err := realMain(&in, &out, []string{"test"})
	assert.NoError(t, err)
	assert.Contains(t, out.String(), "Hello, world!")
}
```

## Работа с флагами

Немного усложним наш пример. Теперь мы хотим выводить в консоль не просто "Hello, world!", но и имя, которое можно задать с помощью флага `-name`. Если же имя не указано, то необходимо вернуть пользователю ошибку.

Флаги командной строки мы можем получить из параметра `args` следующим образом:

```go
var (
	errNoNameGiven = errors.New("no name given")
)

func realMain(in io.Reader, out io.Writer, args []string) error {
	// args[0] содержит имя исполняемого файла
	flags := flag.NewFlagSet(args[0], flag.ContinueOnError)
	name := flags.String("name", "", "your name")

	// Остальные аргументы лежат в args, начиная с 1-го элемента
	if err := flags.Parse(args[1:]); err != nil {
		return err
	}

	if *name == "" {
		return errNoNameGiven
	}

	fmt.Fprintf(out, "Hello, %s!\n", *name)

	return nil
}
```

Мы можем воспользоваться табличными тестами, чтобы проверить поведение нашего приложения при разных флагах на входе:

```go
func TestRealMain(t *testing.T) {
	testCases := []struct {
		name   string
		flags  []string
		err    error
		output string
	}{
		{
			name:   "valid",
			flags:  []string{"-name", "John Doe"},
			err:    nil,
			output: "Hello, John Doe!",
		},
		{
			name:   "no name given",
			flags:  []string{},
			err:    errNoNameGiven,
			output: "",
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			var in, out bytes.Buffer
			err := realMain(&in, &out, append([]string{"test"}, tc.flags...))
			assert.Equal(t, err, tc.err)
			assert.Contains(t, out.String(), tc.output)
		})
	}
}
```

## Вывод

Такой подход делает наш код более идиоматичным и удобным в тестировании. Теперь мы прозрачно можем тестировать такие вещи, как работа с вводом/выводом, флаги и т.п.
