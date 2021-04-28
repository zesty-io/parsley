// uses fontawesome 5 icons from https://fontawesome.com/cheatsheet
export const ContentTypes = {
  image: {
    icon : 'image',
    name: 'Image(s)', 
    type: 'content',
    description: 'Reference to image ZUIDs in Zesty.io',
    html: '<img src="*" alt="@" width="100%" />',
    draggable: true
  },
  images: {
    icon : 'images',
    name: 'Image(s)', 
    type: 'content',
    description: 'Reference to image ZUIDs in Zesty.io',
    html: '<img src="*" alt="@" width="100%" />',
    draggable: true
  },
  textarea: {
    icon : 'align-justify',
    name: 'Text Area',
    type: 'content',
    html: '<div class="pvlTextarea">*</div>',
    description: 'Mixed Plain and Rich Text',
    draggable: true
  },
  text: {
    icon : 'text-height',
    name: 'Text',
    type: 'content',
    html: '<h1 class="pvlHeader">*</h1>',
    description: 'Plain Text',
    draggable: true
  },
  wysiwyg_basic: {
    icon: 'outdent',
    name: 'Rich Text',
    type: 'content',
    html: '<div class="pvlRichtext">*</div>',
    description: 'Text with HTML references.',
    draggable: true
  },
  wysiwyg_advanced: {
    icon: 'outdent',
    name: 'Rich Text',
    type: 'content',
    html: '<div class="pvlRichtext">*</div>',
    description: 'Text with HTML references.',
    draggable: true
  },
  article_writer: {
    icon: 'outdent',
    name: 'Rich Text',
    type: 'content',
    html: '<div class="pvlRichtext">*</div>',
    description: 'Text with HTML references.',
    draggable: true
  },
  rich: {
    icon: 'outdent',
    name: 'Rich Text',
    type: 'content',
    html: '<div class="pvlRichtext">*</div>',
    description: 'Text with HTML references.',
    draggable: true
  },
  link: {
    icon: 'link',
    name: 'URL',
    type: 'content',
    html: '<a href="*" class="pvlLink">*</a>',
    description: 'URL for Linking',
    draggable: true
  },
  date: {
    icon: 'calendar-alt',
    name: 'Date',
    type: 'content',
    html: '<span class="pvlDate">*</span>',
    description: 'Formatted Date',
    draggable: true
  },
  loading: {
    icon: 'redo-alt',
    name: 'Loading',
    type: 'loading',
    description: 'Slow or failed to load. Re-check your configuraion if consitent',
    draggable: true
  },
  columns: {
    icon: 'table',
    name: 'Columns',
    type: 'layout',
    description: 'Text with HTML references.',
    draggable: true
  },
  design: {
    icon: 'pencil-ruler',
    name: 'Design Element',
    type: 'layout',
    description: 'Text with HTML references.',
    draggable: true
  },
  break: {
    icon: '',
    name: 'break',
    type: 'break',
    description: 'layout break line',
    draggable: false
  },
  unknown: {
    icon: 'question',
    name: 'Unknown',
    type: 'unknown',
    description: 'Unknown Layout Object Type',
    draggable: false
  }
}
 