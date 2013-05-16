module.exports = function (app) {
  return {

    /**
     * Just shows the startpage
     * @param {Request}
     * @param {Response}
     */
    view: function (req, res) {
      res.render(
        'index', 
        {
            title:'Good title'
        }
      );
    }
  }
}