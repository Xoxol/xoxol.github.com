var tree = require('less').tree;

function featuresChecker(features) {
    this._features = features;
}

featuresChecker.prototype = {
    run: function() {
        var features = this._features;

        tree.functions.feature = function(feature) {
            return features[feature.value] && features[feature.value].state ? tree.True : tree.False;
        }
    }
};

module.exports = featuresChecker;