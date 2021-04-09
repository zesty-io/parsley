# Parsley Visual Layout Tool

A NO CODE tool for authoring HTML layouts that outputs HTML and CSS with Zesty.io Parsley references.

* Built in React
* Drag-n-Drop
* Self Recursive
* Output to HTML with Parsley References
* Reads a Zesty.io Content Model and Fields
* Output can be read as JSON or HTML
* Will use a lightweight CSS framework: [Reflex](https://github.com/leejordan/reflex)
* Elements in output all have a `pvl-*` class on them

# Part of the Layout App

## LayoutTree

The layout will always start with a root object, which can contain other objects, either stacked in an array. 

**Here is an example tree.**
```
Root Object (container)
  * Headline
  * Row
    * Column
      * Image
    * Column
      * Text
      * Wysiwyg
      * Row
        * Column
          * Image
        * Column
          * Image
  * Wysiwyg
  * HR
  * Row
    * Column
      * Image
    * Column
      * Text
      * Date
      * Wysiwyg
```
## LayoutObject

A layout object is a top level class that holds information to 

* Access itself (UID)
* Build the element  
* Access its parent on the tree
* Access its children on the tree
* Reference Content
* Optional Behavior

**Types of Layout Objects and specific behaviors**

* Layout:Row
* Layout:Column
  * Width: %
* Content:Text
  * Element: h1, h2, p etc
* Content:Image
  * width: px
  * height: px
  * resize: fit|crop
  * alt: text
* Content:Date
* Content:RichText

**Layout Object Properties**

* UID (string)
* Parent (Object)
* Children (Array)
* Content (object)
  * ZUID
  * Name
* Type
* SubType

**Layout Object Methods**

* to String - displays the output
* onHover - changes its display, record the object being held over it
* onDrag
* onDrop
