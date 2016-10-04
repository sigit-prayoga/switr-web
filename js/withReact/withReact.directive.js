(function() {
    'use strict';
    angular.module('switrApp').directive('withReact', withReact);

    function withReact() {
        var ReactComponent = React.createClass({
            render() {
                //get swits array from the props
                var swits = this.props.data;
                if (!swits) {
                    //render empty swits
                    return React.createElement('h3', {}, 'Empty swits');
                }

                var list = swits.map(function(current){
                    //format time with moment, e.g: '3 minutes ago'
                    var formattedTime = moment(current.time).fromNow()
                    //create element for time and should be on the right alignment
                    var timeAgo = React.createElement('small', {className: "pull-right"}, formattedTime);
                    //create element for each swit
                    var swit = React.createElement('h5', { key: current.time }, current.text, timeAgo);
                    //create a container and put all there.
                    var container = React.createElement('div', {className: 'list-group-item'}, swit);

                    return container;
                });

                return React.createElement('ul', {className: 'list-group'}, list);
            }
        });

        return {
            restrict: 'E',
            scope: {
                swits: '='
            },
            link: function(scope, el, attr) {
                console.log('scope.swits', scope.swits);
                //watch to any changes for 'swits'
                scope.$watchCollection('swits', function(newVal, oldVal){
                    if (newVal) {
                        console.log('newVal', newVal);
                        //render React element
                        //Not sure this is the right approac to use React in Angular.
                        ReactDOM.render(React.createElement(ReactComponent, {data: scope.swits}), el[0]);
                    }
                }, true);
            }
        };
    }
})();