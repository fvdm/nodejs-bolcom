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
    this._config = {
      apikey,
      timeout,
    };
  }


  /**
   * Clean up product URLs
   *
   * @param   {object}  product  Product to clean
   *
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
   *
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
   *
   * @return  {object}           Cleaned product
   */

  async _cleanProductAttrGroups (product) {
    let groups = {};
    let group;
    let attrib;
    let key;

    if (!product.attributeGroups) {
      return product;
    }

    for (let i = 0; i < product.attributeGroups.length; i++) {
      group = product.attributeGroups[i];
      groups[group.title] = {
        title: group.title,
      };

      if (group.attributes) {
        groups[group.title].attributes = {};

        for (let a = 0; a < group.attributes.length; a++) {
          attrib = group.attributes[a];
          key = attrib.key || attrib.label;

          groups[group.title].attributes[key] = attrib;
        }
      }
    }

    product.attributeGroups = groups;
    return product;
  }


  /**
   * Clean up product data
   *
   * @param   {object}  product  Object to clean
   *
   * @return  {object}           Cleaned object
   */

  async _cleanProduct (product) {
    return this._cleanProductUrls (product)
      .then (this._cleanProductImages)
      .then (this._cleanProductAttrGroups)
    ;
  }


  /**
   * Communication with API
   *
   * @param   {object}  o
   *
   * @param   {string}  o.endpoint      `api.bol.com/:ENDPOINT`
   * @param   {object}  [o.parameters]  Request paramaters
   *
   * @return  {Promise<object>}
   */

  async _talk ({
    endpoint,
    parameters = {},
  }) {
    const options = {
      url: `https://api.bol.com${endpoint}`,
      method: 'GET',
      timeout: this._config.timeout,
      parameters: {
        ...parameters,
        apikey: this._config.apikey,
        format: 'json',
      },
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'bolcom.js (https://www.npmjs.com/package/bolcom)',
      },
    };

    // send request
    const res = await doRequest (options);
    const data = JSON.parse (res.body);

    // API error
    if (data.status) {
      const error = new Error (data.title);

      error.status = data.status;
      error.detail = data.detail;

      throw error;
    }

    // success
    return data;
  }


  /**
   * Method: ping
   *
   * @return  {Promise<object>}
   */

  async ping () {
    return this._talk ({
      endpoint: '/utils/v4/ping',
    });
  }


  /**
   * Generic catalog request handler
   *
   * @param   {object}  props
   * @param   {string}  props.endpoint      Catalog method name
   * @param   {object}  [props.parameters]  Parameters
   *
   * @return  {Promise<object>}
   */

  async _catalogTalk ({
    endpoint,
    parameters,
  }) {
    delete arguments[0].endpoint;

    const data = await this._talk ({
      endpoint,
      parameters,
    });

    data.products.forEach (async (itm, i) => {
      data.products[i] = await this._cleanProduct (itm);
    });

    return data;
  }


  /**
   * Method: catalog search
   *
   * @param   {object}  parameters  Method parameters
   *
   * @return  {Promise<array>}
   */

  async catalogSearch (parameters) {
    return this._catalogTalk ({
      endpoint: '/catalog/v4/search',
      parameters,
    });
  }


  /**
   * Method: catalog lists
   *
   * @param   {object}  parameters  Method parameters
   *
   * @return  {Promise<object>}
   */

  async catalogLists (parameters) {
    return this._catalogTalk ({
      endpoint: '/catalog/v4/lists',
      parameters,
    });
  }


  /**
   * Method: catalog products
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
      endpoint: `/catalog/v4/products/${productId}`,
      parameters: arguments[0],
    });
  }


  /**
   * Method: catalog recommendations
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
      endpoint: `/catalog/v4/recommendations/${productId}`,
      parameters: arguments[0],
    });
  }


  /**
   * Method: catalog related products
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
      endpoint: `/catalog/v4/relatedproducts/${productId}`,
      parameters: arguments[0],
    });
  }

};
