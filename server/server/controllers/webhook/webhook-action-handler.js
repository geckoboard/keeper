const { getStory } = require('../helpers');

class WebhookActionHandler {
  constructor() {
    this.cases = [];
    this.story = null;

    this.getStory = this.getStory.bind(this);
  }

  async getStory(id) {
    if (this.story && this.story.id === id) {
      return this.story;
    }

    this.story = await getStory(id);

    return this.story;
  }

  registerCase(_case) {
    this.cases.push(_case);
  }

  async handle(action, refs) {
    for (let i = 0; i < this.cases.length; i++) {
      const match = await this.cases[i].test(action, refs, this.getStory);

      if (!match) {
        continue;
      }

      return await this.cases[i].handler(action, refs, this.getStory);
    }
  }
}

module.exports = WebhookActionHandler;
