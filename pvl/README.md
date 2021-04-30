# Development state notes

- [X] Setup React Webpack (React 16 to matches manager-ui)
- [X] Install React-DND
- [X] Connect DND to component
- [X] setup DND decorator API https://react-dnd.github.io/react-dnd/docs/api/drop-target
- [X] Test dragging and dropping
- [X] Connect to remote endpoint in zesty, store in top level state
- [X] pass content down to content bank, display layoutobjects (pass in types as props)
- [X] Setup layout object bank
- [X] Create Layout objects json file
- [X] Design Layout objects interface
- [X] Iterate through GQL object for content bank, collapsable content models
- [X] Design the content model collapsing
- [X] Move content mutatation into top level PVL before going into content bank
- [X] Search through content filter, hiding etc
- [X] Collapse content model button and functionality 
- [X] clear collapse on search, bring it back
- [X] CSS design content model area
- [X] CSS design content model object
- [X] Clear content filter
- [X] Start Matching design
- [ ] Star/Select current Content Model
- [X] Connect collapse button to CSS functionality and prop passing
- [X] Test building tree on main component from drag n drop objects
- [X] Work on layout object to adapt to different styles based on its incoming object
- [X] Create Column Layout Object that is droppable
- [X] Make different layout designs for visual layout container
- [X] Expand layoutobject to have different behaviors per type and content
- [X] Add content references to the dropped columns
- [X] Move content objects around
- [X] Make a layoutobject (columns) droppable once in the canvas
- [X] A proper way to delete items
- [X] Fix to error where dropping on itself deletes itself (race condition)
- [X] Create Code tab, Visual tab bar
- [X] build tree function which is passed around to build a large tree for code building
- [X] Clean up presentation
- [X] Fix tertiary drop error with tree building
- [ ] Design the drop area
- [X] Code Output component - Recieves Tree and outputs HTML with parsley
- [X] Preview Rendering
- [ ] Output Targets (snippet, export html, view file, wysiwyg target)
- [ ] Setup "demo" mode which always runs the zesty.io marketing website
- [ ] Setup instanceZUId prop, if not available, creates a prompt to select an instance (requires auth)
- [ ] If modelZuid not passed, setup a prompt to select model zuid to work with (or free form)
- [ ] Save and publish button for snippets
- [ ] 
## Considerations

Our Goal... To make Zesty.io like nothing you've ever experienced...

- [ ] Setup {{include}} code object bank component - loads snippets
- [ ] fetch remote file data for snippets, or fake it for now
- [ ] Allow Parsley in Rich Fields (enables content designer and forms to be include like {{include forms2}} )

# How it works

* **In Schema:** Each content model has a visual layout tab
 * Output write to a snippet named [MODEL_ZUID]-pvl.parsley
 * {{this.autolayout()}} will look for that reference
* **In Content:** Each Content Item will have an PVL (content designer) tab which defaults to the content model design (if it exists)
  * The output of PVL writes to a new content item field `_pvl`
  * The items PVL will override the model PVL 
* In Code: The [MODEL_ZUID]-pvl.parsley files will be accessible to edit

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

## How to Use

The Zesty.io Instance's `GQL` setting should be set to be on. Start with property `instanceZUID`, if it is blank it will default to zesty.io/-/gql/, if you pass an instanceZUID it attempts to connect to the preview URL for that ZUID. Not preview lock will block this requrest, so the user should have an active session to access their {instanceZUID}-dev.zesty.io/-/gql/. 

```
<ParsleyVisualLayout instanceZUID=""></ParsleyVisualLayout>
```

## How to Run Locally

Install Global Tools
```
npm install -g react
npm install -g webpack-cli
npm install -g less
npm install -g less-watch-compiler
```

From base `pvl` directory, run two terminals

Terminal 1
```
webpack
```
Terminal 2
```
npm run watch-less
```

Install VS Code live server, open `example.html` with live server extension

# Documenting of the Layout App

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

## LayoutObject Dragging

[An ID is needed for React DND](https://react-dnd.github.io/react-dnd/docs/overview), and that is all that you are working with. Since we do not use REDUX or FLUX for this component, we need to know as much from the ID as possible. Since Layout Object are not related to their actual layout we will be creating a new layout object upon drop. To do this we will need a key that tells us what to do.

Design Format ID: `[primarytype]:[type]` e.g. `design:2columns`
Content Format ID: `[primarytype]:[type]:[model]:[field_name]` e.g. `content:text:about:title`

The key is split by `:` dilimiter and used to create a new layout object in the VisualLayout component


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

# Interface

**Concept**
![image](https://user-images.githubusercontent.com/729972/114240505-77af5980-993c-11eb-8f0c-024aa94a3f28.png)
