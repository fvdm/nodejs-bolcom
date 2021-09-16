/*
Name:         bolcom.js
Description:  Module for node.js to access Bol.com Open API service
Author:       Franklin (https://fvdm.com)
Source:       https://github.com/fvdm/nodejs-bolcom
License:      Unlicense
*/

const { doRequest } = require ('httpreq');

module.exports = class BolcomAPI {

  constructor ({
    apikey,
    timeout = 5000,
  }) {
    this._config = arguments[0];
  }


  /**
   * Clean up product URLs
   *
   * @param   {object}  product  Product to clean
   * @return  {object}           Cleaned product
   */

  async _cleanProductUrls (product) {
    let urls = {};
    let url;

    for (let i = 0; i < product.urls.length; i++) {
      url = product.urls[i];
      urls[url.key] = url;
    }

    product.urls = urls;
    return product;
  }


  /**
   * Clean up product images
   *
   * @param   {object}  product  Product to clean
   * @return  {object}           Cleaned product
   */

  async _cleanProductImages (product) {
    let imgs = {};
    let image;

    if (!product.images) {
      return product;
    }

    for (let i = 0; i < product.images.length; i++) {
      image = product.images[i];
      imgs[image.key] = product.images[i];
    }

    product.images = imgs;
    return product;
  }


  /**
   * Clean up product attributeGroups
   *
   * @param   {object}  product  Product to clean
   * @return  {object}           Cleaned product
   */

  async _cleanProductAttrGroups (product) {
    let groups = {};
    let group;
    let attrib;

    if (product.attributeGroups) {
      for (let i = 0; i < product.attributeGroups.length; i++) {
        group = product.attributeGroups[i];
        groups[group.title] = {
          title: group.title,
        };

        if (group.attributes) {
          groups[group.title].attributes = {};

          for (let a = 0; a < group.attributes.length; a++) {
            attrib = group.attributes[a];
            groups[group.title].attributes[attrib.key] = attrib;
          }
        }
      }

      product.attributeGroups = groups;
    }

    return product;
  }


  /**
   * Clean up product data
   *
   * @param   {object}  product  Object to clean
   * @return  {object}           Cleaned object
   */

  async _cleanProduct (product) {
    return this._cleanProductUrls (product)
      .then (this._cleanProductImages)
      .then (this._cleanProductAttrGroups)
    ;
  }


  /**
  * Method: search suggestions
  *
  * @return  {Promise<object>}
  *
  * @param   {object}  o
  * @param   {string}  o.term  Search term (fuzzy)
  * @param   {string}  o.xcat  Product catagory
  */

  async searchSuggestions ({
    term,
    xcat = 'media_all',
  }) {
    const options = {
      url: `https://zoeksuggesties.s-bol.com/extern/qs/OpenSearch/${xcat}/${term}`,
      method: 'GET',
      timeout: this._config.timeout,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'bolcom.js (https://www.npmjs.com/package/bolcom)',
      },
    };

    const res = await doRequest (options);
    let data = res.body;

    data = data.replace ('{terms:', '{"terms":');
    data = data.replace (',categories:', ',"categories":');
    data = data.replace (',brands:', ',"brands":');

    data = JSON.parse (data);

    if (data.status) {
      const error = new Error (data.title);

      error.status = data.status;
      error.detail = data.type;

      throw error;
    }

    return data;
  }


  /**
   * Communication with API
   *
   * @param   {object}  o
   * @param   {string}  o.cat           api.bol.com/:CAT/v4/method
   * @param   {string}  o.method        api.bol.com/cat/v4/:METHOD
   * @param   {object}  [o.parameters]  Request paramaters
   *
   * @return  {Promise<object>}
   */

  async _talk ({
    cat,
    method,
    parameters = {},
  }) {
    const options = {
      url: `https://api.bol.com/${cat}/v4/${method}`,
      method: 'GET',
      timeout: this._config.timeout,
      parameters,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'bolcom.js (https://www.npmjs.com/package/bolcom)',
      },
    };

    options.parameters.apikey = this._config.apikey;
    options.parameters.format = 'json';

    // send request
    const res = await doRequest (options);
    const data = JSON.parse (res.body);

    if (data.status) {
      const error = new Error (data.title);

      error.status = data.status;
      error.detail = data.detail;

      throw error;
    }

    return data;
  }


  /**
   * Method: ping
   *
   * @return  {Promise<object>}
   */

  async ping () {
    return this._talk ({
      cat: 'utils',
      method: 'ping',
    });
  }


  /**
   * Generic catalog request handler
   *
   * @param   {object}  props         Parameters
   * @param   {string}  props.method  Catalog method name
   *
   * @return  {Promise<object>}
   */

  async _catalogTalk ({
    method,
  }) {
    delete arguments[0].method;

    const data = await this._talk ({
      cat: 'catalog',
      method,
      parameters: arguments[0],
    });

    data.products.forEach (async (itm, i) => {
      data.products[i] = await this._cleanProduct (itm);
    });

    return data;
  }


  /**
   * Method: catalog.search
   *
   * @param   {object}  props  Method parameters
   *
   * @return  {Promise<object>}
   */

  async catalogSearch (props) {
    return this._catalogTalk ({
      method: 'lists',
      parameters: props,
    });
  }


  /**
   * Method: catalog.lists
   *
   * @param   {object}  props  Method parameters
   *
   * @return  {Promise<object>}
   */

  async catalogLists (props) {
    return this._catalogTalk ({
      method: 'lists',
      parameters: props,
    });
  }


  /**
   * Method: catalog.products
   *
   * @param   {object}  props            Parameters
   * @param   {string}  props.productId  Product ID
   *
   * @return  {Promise<object>}
   */

  async catalogProducts ({
    productId,
  }) {
    delete arguments[0].productId;

    return this._catalogTalk ({
      method: `products/${productId}`,
      parameters: arguments[0],
    });
  }


  /**
   * Method: catalog.offers
   *
   * @param   {object}  props            Parameters
   * @param   {string}  props.productId  Product ID
   *
   * @return  {Promise<object>}
   */

  async catalogOffers ({
    productId,
  }) {
    delete arguments[0].productId;

    return this._talk ({
      cat: 'catalog',
      method: `offers/${productId}`,
      parameters: arguments[0],
    })
      .then (data => data.offerData)
    ;
  }


  /**
   * Method: catalog.recommendations
   *
   * @param   {object}  props            Parameters
   * @param   {string}  props.productId  Product ID
   *
   * @return  {Promise<object>}
   */

  async catalogRecommendations ({
    productId,
  }) {
    delete arguments[0].productId;

    return this._catalogTalk ({
      method: `recommendations/${productId}`,
      parameters: arguments[0],
    });
  }


  /**
   * Method: catalog.relatedproducts
   *
   * @param   {object}  props            Parameters
   * @param   {string}  props.productId  Product ID
   *
   * @return  {Promise<object>}
   */

  async catalogRelatedProducts ({
    productId,
  }) {
    delete arguments[0].productId;

    return this._talk ({
      cat: 'catalog',
      method: `relatedproducts/${productId}`,
      parameters: arguments[0],
    });
  }

};
