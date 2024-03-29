
git - [ ] Render JSON output that could be read by NextJS to make rows/columns 
- [ ] If modelZuid not passed, setup a prompt to select model zuid to work with (or free form)


## Considerations

Our Goal... To make Zesty.io like nothing you've ever experienced...

- [ ] Setup {{include}} code object bank component - loads snippets
- [ ] fetch remote file data for snippets, or fake it for now
- [ ] Allow Parsley Rendering in Rich Fields (enables content designer and forms to be include like {{include forms2}} )

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

## How it works in Zesty.io

* **In App:** A Visual Layout Tab - it is provided an instanceZUID prop, user selects a model to edit
* **In Schema:** Each content model has a visual layout tab
 * Output writes to a snippet named [MODEL_ZUID]-pvl.parsley, save and publish available in tool
 * {{this.autolayout()}} will look for that reference
* **In Content:** Each Content Item will have an PVL (content designer) tab which defaults to the content model design (if it exists)
  * The output of PVL writes to a new content item field `_pvl`
  * The items PVL will override the model PVL sotred in [MODEL_ZUID]-pvl.parsley
* In Code: The [MODEL_ZUID]-pvl.parsley files will be accessible to edit
* **Free Form mode** No saving, just makes code for copying


## How to Use

It must be used in a react app. Import the ParsleyVisualLayout component, and enter it into your JSX.T he Zesty.io Instance's `GQL` setting must be set to [true] in order to run, else it fails.  

Instantiation examples:

```
<ParsleyVisualLayout></ParsleyVisualLayout>
```
Runs and looks for a Zesty.io user auth token, then prompts the user to select an Instance from their access list, then asks them to select a model or include, or use freeform mode.

```
<ParsleyVisualLayout instanceZUID="[INSTANCE_ZUID]" modelZUID="[MODEL_ZUID]"></ParsleyVisualLayout>
```
When provided both the instance and model zuid as props, it automatically starts with the model selected. If the model is not included in the instance ZUID, it will fail to load.

```
<ParsleyVisualLayout instanceZUID="[INSTANCE_ZUID]"></ParsleyVisualLayout>
```
When provided an instance but not a model zuid, the app asks them to select a model or include, or use freeform mode.

```
<ParsleyVisualLayout demo=true></ParsleyVisualLayout>
```
With demo passed as a prop, the tool runs in demo mode using freeform  on the zesty.io website instance.


```
<ParsleyVisualLayout instanceZUID="[INSTANCE_ZUID]" modelZUID="[MODEL_ZUID]" itemZUID="[ITEM_ZUID]"></ParsleyVisualLayout>
```
When provided the instance, model, and item zuid as props, it automatically starts with the model selected but will attempt to write an pvl/content designer item field, it it doesn exist, it will create it, and then write to it. If the item doesnt exist it will fail to load. When i item exists, it will preload item data to populate in the design experience. 


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

Install VS Code live server, open `demo.html` with live server extension

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

Design Format ID: `[primarytype]:[type]:[name]` e.g. `design:columns:2columns`
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
