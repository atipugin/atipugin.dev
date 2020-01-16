---
title: Расширения для VS Code
date: 2020-01-15
icon: ":toolbox:"
---

Решил немного рассказать о расширениях для VS Code, которые здорово упрощают мою жизнь. Специально не стал упоминать ничего, связанного конкретными языками ([Go](https://marketplace.visualstudio.com/items?itemName=ms-vscode.Go), [Ruby](https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby), [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)), потому что тут уже зависит, на чем вы пишите.

## EditorConfig

EditorConfig - первое расширение, которое я ставлю в любом редакторе, который планирую более-менее серьезно использовать. Если вы еще не в курсе (такое возможно?), то [EditorConfig](https://editorconfig.org) автоматически применяет правила форматирования текста в зависимости от типа файла. Правила определяется в файле с конфигом ([вот мой](https://github.com/atipugin/dotfiles/blob/master/editorconfig), например). В больших проектах, в которых участвует много разработчиков, удобно добавлять такой конфиг прямо в репозиторий, чтобы у всех были одинаковые настройки.

[Открыть на Marketplace](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

## Git Blame

Git Blame - простое и супер-удобное расширение для работы с `git blame`. Просто ставите курсор на интересующую строку в файле, нажимаете на кнопку и получаете описание коммита с возможностью перейти на страницу с коммитом на GitHub/GitLab/что-там-у-вас.

![Git Blame](/posts/vscode-extensions/git-blame.gif)

Раньше для этих целей я использовал [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens), но в какой-то момент устал от его тормозов и перешел на Git Blame.

[Открыть на Marketplace](https://marketplace.visualstudio.com/items?itemName=waderyan.gitblame)

## Project Manager

Project Manager сильно упрощает жизнь в плане быстрой навигации между проектами. Вы можете либо вручную добавлять проекты в избранное, либо прописать в настройках папки, в которых расширение будет искать, например, git-репозитории:

```json
{
  "projectManager.git.baseFolders": [
    "/Users/atipugin/Code"
  ]
}
```

В примере выше Project Manager просканирует всю папку `Code` и добавит найденные репозитории в список проектов, между которыми можно быстро переключаться.

[Открыть на Marketplace](https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager)

## Better Comments

Better Comments раскрашивает комментарии в коде в зависимости от их типа, который определяется по префиксу в начале строки. Например, TODO или предупреждения, на которые нужно обратить внимание.

Так выглядит код без Better Comments:

![Без Better Comments](/posts/vscode-extensions/better-comments-off.png)

А так с ним:

![С Better Comments](/posts/vscode-extensions/better-comments-on.png)

[Открыть на Marketplace](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)

## Todo Tree

Если вы, как и я, любите развешивать в коде комментарии вида `TODO: Не забыть выпилить это через месяц`, то вы точно оцените Todo Tree. Это расширение сканирует текущий проект, находит все подобные напоминания и формирует эдакий "список дел".

Выглядит примерно так:

![Todo Tree](/posts/vscode-extensions/todo-tree.png)

[Открыть на Marketplace](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)

## Тема оформления

В комментариях под видео часто спрашивают, какой темой оформления я пользуюсь. Рассказываю:

- Тема - [One Dark Pro](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
- Иконки - [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

Полный список плагинов, которыми я пользуюсь, можно найти [здесь](https://github.com/atipugin/dotfiles/blob/master/vscode_extensions.txt).
