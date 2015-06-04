#Stack Exchange References

--------------

##What is it?

Stack Exchange References is a userscript for easily putting in references in answers and questions.

--------------

##Description

- In the top bar of any answer or question on SE, a new image is added, which looks like:

  ![partial screenshot][1]

- When the `[1]` icon is clicked on, or you press <kdb>Ctrl+Y</kbd>, you will get a reference put into your post

- You will get prompted for the reference link and name

- `<sup>[1]</sup>`, which will end up looking like <sup>[1]</sup>, will be put into the post's textarea wherever your cursor is

- `<sup>[1: Title of Reference][2]</sup>` will be appended to the textarea, which will appear as <sup>[1: Title of Reference][3]</sup>

- Under the title of the reference, `  [1]: reference link` will be put in the text area

-------------

##Source Code/Download

You can view that source code on [Github][4], feel free to contribute. You can download the userscript [here][5].

-----------

##Bugs

I'm sure there are several bugs (one is that the `[1]` icon is terrible), so if you find any, please post them as an answer on [StackApps][6] or [raise them as an issue][7] on Github.


  [1]: http://i.stack.imgur.com/axLtg.png
  [2]: http://www.example.com/
  [3]: http://www.example.com/
  [4]: https://github.com/michaelpri10/SE-References
  [5]: https://github.com/michaelpri10/SE-References/raw/master/references.user.js
  [6]: http://stackapps.com/questions/6376/stack-exchange-references
  [7]: https://github.com/michaelpri10/SE-References/issues/new
