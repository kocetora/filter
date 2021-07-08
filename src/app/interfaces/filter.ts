interface Input {
  type: string;
  title: string,
}

interface Text extends Input {
  type: 'text',
  placeholder: string
}

interface Select extends Input {
  type: 'select'
  options: string[]
}
  
export type Filter = Select | Text; 