import parse from 'html-react-parser';

class Rainbow {	
  constructor() {
    this.colorIndex = 0;
    this.rainbow = '';
    this.colors = ['#e6194B', '#f58231', '#ffe119', '#3cb44b', '#4363d8', '#911eb4'];
  }
  
  /**
   * Validates that the provided hex values are valid
   * @param  {array}    config - An array of hex colors
   */
  validateConfig(config) {
    if (Array.isArray(config)) {
      for (let color of config) {
        // this regex verifies that the provided color value is a hex code:
        // it should have 3 or 6 characters, preceded by a # symbol. The
        // valid letter range is A-F or a-f.
        
        const hexRegex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
        
        if (!hexRegex.test(color)) {
          console.warn(`${color} is an invalid hex code. Using defaults!`);
          return false;
        }
      }
    } else {
      console.warn(`You need to pass an array of hex codes of any length. Using defaults!`);
      return false;
    }
    
    this.colors = config;
    console.log('Custom Rainbowifying!')
  }

  /** 
   * Indentifies the nodes to be colorized, and initializes the colorizing
   * process for the each node
   * @param  {obj or string}     text - the text or JSX object passed by the user
   */
  rainbowify(text) {
    const nodes = text.props ? [...text.props.children] : [text];

    for (let node of nodes) {
      const nodeType = node.type ? node.type : 'span' 
      this.processNode(node, nodeType);
    }
  }

  /** 
   * Processes each node by identifying any childnodes and sending them to be
   * colorized
   * @param  {obj}     node - the JSX object to be processed
   * @param  {string}     nodeType - the type of JSX object
   */
  processNode(node, nodeType) {
    this.rainbow += `<${nodeType}>`;

    if (node.props) {
      for (let child of node.props.children) {
        // If the current child node has children, we must recursively process
        // each child node until we've reached the deepest one so every part of the 
        // text is appropriately colorized.
    
        if (child.props) {
          this.processNode(child.props.children);
        } else {
          this.applyColorStyles(child)
        } 
      }  
    } else {
      this.applyColorStyles(node);
    }

    this.rainbow += `</${nodeType}>`;
  }

  /** 
   * Applies correct color to passed node
   * @param  {string}     text - the text to be colorized
   */
  applyColorStyles(text){
    for (let char of text) {
  
      // If the character has extra whitespace around it, like a line break, we
      // remove it so the white space does not count as a character to be colorized.
  
      char = char.trim();
  
      // If the character is now an empty string, we realize there should be a single
      // space inserted into the returned string at this position, otherwise we
      // should apply the color style.
  
      if (char === '') {
        this.rainbow += ' ';
      } else {
        this.rainbow += `<span style = "color:${this.colors[this.colorIndex]}">${char}</span>`;
        this.colorIndex = this.colorIndex === this.colors.length - 1 ? 0 : this.colorIndex + 1;
      }
    }
  }
}

const rainbowify = (text, config) => {
  const rainbow = new Rainbow();
  
  if (config) {
    rainbow.validateConfig(config);
  }
  
  rainbow.rainbowify(text);
  return parse(rainbow.rainbow);
}

export default rainbowify;