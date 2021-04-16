// uses fontawesome 5 icons from https://fontawesome.com/cheatsheet
export const LayoutObjectTypes = {
  image: {
    icon : 'image',
    name: 'Image(s)',
    type: 'content',
    description: 'Refernces to image ZUIDs in Zesty.io',
    draggable: true
  },
  text: {
    icon : 'text-height',
    name: 'Text',
    type: 'content',
    description: 'Plain Text',
    draggable: true
  },
  rich: {
    icon: 'outdent',
    name: 'Rich Text',
    type: 'content',
    description: 'Text with HTML references.',
    draggable: true
  },
  link: {
    icon: 'link',
    name: 'URL',
    type: 'content',
    description: 'URL for Linking',
    draggable: true
  },
  date: {
    icon: 'calendar-alt',
    name: 'Date',
    type: 'content',
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
 