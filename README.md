# react-outerclick

HOC wrapper with frugal document event strategy

Get a callback when a click happens outside of your component. If your React class implements `handleOuterClick`, it will get called when a click outside of the root node for your element takes place.

## Installation

```bash
npm i react-outerclick
```

## Usage

As a HOC, you can use the ES7 decorator style:

```js
import React from 'react';
import outerClick from 'react-outerclick';
 
@outerClick
class Foo extends React.Component {

  state = {
    opened: true  
  };

  handleOuterClick(event){
    this.setState({
        opened: false
    });
  }

  render(){
    return <div>Foo. Click elsewhere</div>;
  }
}

export default Foo;
```

Alternatively, without `stage-0` and `babel-plugin-transform-decorators-legacy`, this looks like so:

```js
import React from 'react';
import outerClick from 'react-outerclick';
 
class Foo extends React.Component {

  constructor(props){ 
    super(props);
    this.state = {
        opened: true  
    };
  }

  handleOuterClick(event){
    this.setState({
        opened: false
    });
  }

  render(){
    return <div>Foo. Click elsewhere</div>;
  }
}

// decorate here:
export default outerClick(Foo);
```

## Why?

Because: 

 - need to be able to do this with a low footprint - so a single document event handler for all elements that need it.
 - gets `element.ownerDocument` correctly so can work in popups/tearoffs, unlike other implementations 

## Limitations

Hot Module Reloading (react-hmre, react-hot-loader etc) any component that has an outerClick handler will cause the outer click functionality to fail as it's not going to find the old component instance and there is no lifecycle method that is available to refresh the event subscriptions.

## Found an issue, or want to contribute?

If you find an issue, want to start a discussion on something related to this project, or have suggestions on how to improve it? Please [create an issue](../../issues/new)!

See an error and want to fix it? Want to add a file or otherwise make some changes? All contributions are welcome!

## License

MIT
