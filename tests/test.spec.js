var nunjucks = require('nunjucks');
var expect = require('expect.js');
var sinon = require('sinon');
var env = nunjucks.configure({});

var tagName = 'test';
var tag = function () {
    this.tags = ['test'];

    this.parse = function(parser, nodes) {
        parser.advanceAfterBlockEnd();

        var content = parser.parseUntilBlocks("endtest");
        var tag = new nodes.CallExtension(this, 'run', null, [content]);
        parser.advanceAfterBlockEnd();

        return tag;
    };

    this.run = function(context, content) {
        // Reverse the string
        return content().split("").reverse().join("");
    };
};

describe('Tags: ' + tagName, function () {
    var spy, context, resourceInstance;

    before(function () {
        env.addExtension(tagName, new tag());
        context = {
            locals: {
                clz: 'test',
                foo: {
                    bar: 'bar'
                }
            }
        };
    });

    it.only('should render title', function () {
        expect(nunjucks.renderString('{% test %}123456789{% endtest %}', context)).to.equal('987654321');
    });
});

