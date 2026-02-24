Answers to Questions

1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Ans: many difference are there like selection type syntax type.

selection type
#1 Single element by its unique id attribute.
#2 Multiple elements by their class name(s).
#3 First element matching a CSS selector.
#4 All elements matching a CSS selector.

syntax type
*1 No prefix needed for the ID (document.getElementById('myId')).
*2 No prefix needed (document.getElementsByClassName('myClass')).
*3 Requires CSS prefix (document.querySelector('#myId') or document.querySelector('.myClass'))
*4 Requires CSS prefix (document.querySelectorAll('.myClass')).



2. How do you create and insert a new element into the DOM?

Ans: By using document.createElement() to create the element, customize it (content, classes, attributes), and then use methods like appendChild() or insertBefore() to place it within a parent node.



3. What is Event Bubbling? And how does it work?

Ans: Event bubbling is a Tree of HTML and JavaScript DOM event propagation mechanism.
Where an event triggered on a child element (target) propagates upward through its ancestor elements, triggering their respective event handlers in sequence.
It works like bubbles rising in water—starting from the innermost target and moving up to the root (document/window). 



4. What is Event Delegation in JavaScript? Why is it useful?

Ans: Event delegation is a pattern where I use a single parent element to handle events for multiple children by leveraging event bubbling. It's useful because it improves performance by reducing the number of event listeners, automatically works with dynamically added elements, and makes code more maintainable. For example, instead of adding click handlers to every item in a todo list, I'd put one handler on the parent ul and check the event.target to see which item was clicked.



5. What is the difference between preventDefault() and stopPropagation() methods?

Ans: The key difference is their purpose: preventDefault() stops the browser's default action (like following a link or submitting a form), while stopPropagation() stops the event from bubbling up to parent elements. They can be used together when needed - for example, in a custom dropdown menu, I might use preventDefault() on links to prevent navigation and stopPropagation() on the menu to prevent it from closing when clicking inside it.