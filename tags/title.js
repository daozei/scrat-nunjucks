/**
 * update document.title
 *
 * @alias title
 *
 * @example
 * {% title %}{{some_var}}{% endtitle %}
 */

exports.compile = function (compiler, args, content, parents, options, blockName) {
    return ';_output+="<title>";' +
            ';_output+=_ext._resource.pageletTitle((function(){var _output="";' +
            compiler(content, parents, options, blockName) +
            ';return _output})())+"</title>";';
};

exports.parse = function () {
    return true;
};

exports.ends = true;