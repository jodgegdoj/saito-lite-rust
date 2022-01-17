const saito = require('./../../lib/saito/saito');
const ModTemplate = require('../../lib/templates/modtemplate');

class SaitoForum extends ModTemplate {

  constructor(app) {

    super(app);

    this.name = "Saitolicious";
    this.slug = "saitolicious";
    this.description = "Tacos and the Saito Network and Saito Consensus";
    this.categories = "Forum Discussion";

  }
  
  respondTo(type = "") {
    if (type == "post-forum") {
      return {
        name: this.name,
        description: this.description,
        slug: this.returnSlug()
      };
    }
    return null;
  }

}

module.exports = SaitoForum;


