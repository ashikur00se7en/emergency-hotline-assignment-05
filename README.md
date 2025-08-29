**1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?**

**Ans:** These four DOM methods—getElementById, getElementsByClassName, querySelector, and querySelectorAll—are used to select elements from the Document Object Model (DOM) in JavaScript, but they differ in their selection criteria, return types, and behavior.

The differences between them are briefly described below:

🔹 1. getElementById(id)

✅ What it does:
Selects one element by its unique id.

✅ Syntax:
<pre> document.getElementById("myId"); </pre>

✅ Returns:
A single DOM element or null if not found.

🔹 2. getElementsByClassName(className)

✅ What it does:
Selects all elements with a given class name.

✅ Syntax:
<pre> document.getElementsByClassName("myClass"); </pre>

✅ Returns:
An HTMLCollection (live, array-like), not a real array. Live collection – updates automatically if DOM changes.

🔹 3. querySelector(selector)

✅ What it does:
Selects the first matching element using any CSS selector.

✅ Syntax:
<pre>
document.querySelector(".myClass");
document.querySelector("#myId");
document.querySelector("div > span");
</pre>

✅ Returns:
A single DOM element or null if not found.

🔹 4. querySelectorAll(selector)

✅ What it does:
Selects all matching elements using any CSS selector.

✅ Syntax:
<pre>document.querySelectorAll(".myClass");</pre>

✅ Returns:
A NodeList (static, array-like). Not live. Does not auto-update if the DOM changes.

**2. How do you create and insert a new element into the DOM?**

**Ans:** To create and insert a new element into the DOM using JavaScript, I follow these steps:

✅ 1. Create the element

Use document.createElement():

<pre>const newElement = document.createElement('div');</pre>

✅ 2. Customize the element (optional)

Set text, attributes, styles, etc.:

<pre>
newElement.textContent = 'Hello, world!';
newElement.className = 'my-class';
newElement.id = 'my-id';
</pre>

✅ 3. Insert the element into the DOM

Use one of the DOM insertion methods, such as:

▶️ appendChild() (adds as last child):

<pre>document.body.appendChild(newElement);</pre>

▶️ prepend() (adds as first child):

<pre>document.body.prepend(newElement);</pre>

▶️ insertBefore() (adds before a specific node):

<pre>
const referenceNode = document.getElementById('some-existing-element');
document.body.insertBefore(newElement, referenceNode);
</pre>

▶️ insertAdjacentElement() (adds relative to an existing element):

<pre>
const target = document.getElementById('target');
target.insertAdjacentElement('beforeend', newElement); // options: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
</pre>

**3. What is Event Bubbling and how does it work?**

**Ans:** Event bubbling is a mechanism in the DOM where an event triggered on a child element bubbles up through its ancestors, allowing parent elements to also respond to that event.

🧠 **How it works:**

When an event (like a click) happens on a DOM element:

- The event is first handled by the target element.

- Then it bubbles up the DOM tree, giving each ancestor (parent, grandparent, etc.) a chance to handle the same event.

- It stops bubbling when it reaches the document level or is explicitly stopped.

📈 **Visual Example:**

<pre><code>
<div id="parent">
  <button id="child">Click Me</button>
</div>
</code></pre>

<pre>
document.getElementById('parent').addEventListener('click', () => {
  console.log('Parent clicked!');
});

document.getElementById('child').addEventListener('click', () => {
  console.log('Child clicked!');
});
</pre>

✅ **Output when you click the button:**

<pre>
Child clicked!
Parent clicked!
</pre>

First, the click is handled by the #child button.

Then, it bubbles up to the #parent div.

✋ **How to stop it:**

You can prevent event bubbling using:

<pre>event.stopPropagation();</pre>

**Example:**

<pre>
document.getElementById('child').addEventListener('click', (event) => {
    event.stopPropagation();
    console.log('Child clicked!');
});
</pre>

Now clicking the child won't trigger the parent’s event listener.

**4. What is Event Delegation in JavaScript? Why is it useful?**

Ans: Event Delegation is a technique where you add a single event listener to a parent element, and use it to manage events triggered by its child elements, rather than adding individual listeners to each child.

💡 **How it works:**

It relies on event bubbling—when an event on a child element bubbles up to its ancestors, you can catch it on the parent and determine which child triggered it using event.target.

✅ **Example:**

<pre><code>
<ul id="list">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
</code></pre>

**Instead of doing:**

<pre>
  document.querySelectorAll('#list li').forEach(li => {
  li.addEventListener('click', () => console.log('Item clicked'));
});
</pre>

**We can do:**

<pre>
  document.getElementById('list').addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    console.log('Clicked:', event.target.textContent);
  }
});
</pre>

🎯 **Why is Event Delegation useful?**

✅ 1. Better Performance

- Fewer event listeners = lower memory usage.

- Especially valuable when dealing with many elements (e.g. 1000+ list items).

✅ 2. Handles Dynamic Elements

- Works for elements added to the DOM later without needing to reattach event listeners.

✅ 3. Cleaner Code

- Centralizes logic in one place.

- Easier to manage and debug.

**5. What is the difference between preventDefault() and stopPropagation() methods?**

**Ans:** 

🔹 event.preventDefault()

- What it does: Prevents the default browser behavior associated with the event.

- Example uses:

  - Preventing a link from navigating to a new page (<a> tag).

  - Stopping a form submission from refreshing the page.

  - Disabling right-click context menu on an element.

- Does NOT stop event propagation — the event still bubbles or captures normally.

🔹 event.stopPropagation()

- What it does: Stops the event from bubbling up (or capturing down) the DOM tree.

- Prevents parent elements’ event handlers from being triggered by this event.

- Does NOT prevent the default browser behavior.

✅ **Example:**

<pre><code>

<a href="https://example.com" id="myLink">Click me</a>

<div id="parent" style="margin-top: 20px; padding: 10px; border: 1px solid black;">
  Parent Div (Click me too)
</div>

</code></pre>

<pre>
const link = document.getElementById('myLink');
const parent = document.getElementById('parent');

link.addEventListener('click', (event) => {
  event.preventDefault();        // Prevent the default navigation
  event.stopPropagation();       // Stop event from bubbling up to parent
  console.log('Link clicked! preventDefault + stopPropagation called');
});

parent.addEventListener('click', () => {
  console.log('Parent div clicked!');
});
</pre>

**What happens when you click the link?**

- preventDefault() prevents navigating to https://example.com

- stopPropagation() stops the event from bubbling up to the parent div, so its click handler won’t run.

- You only see:

<pre>Link clicked! preventDefault + stopPropagation called</pre>


