/** @jsx React.DOM */

var bundleStore = require("./bundleStore");

var Bundle = React.createClass({
    getInitialState: function() {
        return {items: bundleStore.get()};
    },
    toggleItem: function(item){
    	var items = this.state.items;
    	var duplicate = items.reduce(function(last, it){
    		if (it.name === item.name) {
    			return it;
    		}
    		return last;
    	}, false);

    	if (duplicate === false) {
    		items.push(item);
    	}
    	else {
    		var index = items.indexOf(duplicate);
    		items.splice(index, 1);
    	}

    	bundleStore.set(items);

        this.clearPreviousURL();
    	this.setState({items: items});
    },
    toggleCurrentItem: function(){
        this.toggleItem(this.props.item);
    },
    download: function(){
        var js = bundleStore.getJS(this.state.items);

        // unsafe nasty stuff
        var blob = new Blob([js], {
            type: "application/javascript" 
        });

        var a = document.createElement("a");
        a.download = "nib.js";
        
        var createURL = URL.createObjectURL || URL.webkitCreateObjectURL;

        var url = createURL(blob);
        a.href = url;
        a.click();

        this.setState({_objectURL: url});
    },
    clearPreviousURL: function(){
        var revokeURL = URL.revokeObjectURL || URL.webkitRevokeObjectURL;
        var url = this.state._objectURL;
        if (url) {
            revokeURL(url);
            this.setState({_objectURL: null});
        }
    },
    render: function() {
        var bundle = this, items = this.state.items;

    	var makeItem = function(item){
    		return (<li className="row">
        			<div className="small-9 column f-mono">
                        <h4>{item.name}:{item.category}</h4>
                    </div>
                    <div className="small-3 column f-mono">
        			     <h2 className="f-mono" onClick={bundle.toggleItem.bind(bundle, item)}>×</h2>
                    </div>
    			</li>)
    	}

        return (
            <div>
                <div className="nib-bundle">
                	<h3>Bundle</h3>
                	<ul>
                		{this.state.items.map(makeItem)}
                	</ul>
                    
                </div>
                {this.props.item && (<button onClick={this.toggleCurrentItem}>Add/Remove Current Item</button>)}
                {items && items.length && (<button onClick={this.download}>Download JS</button>)}
            </div>
        );
    }
});



module.exports = Bundle;

