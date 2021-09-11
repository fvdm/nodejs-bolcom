/*
Name:             bolcom.js
Description:      Module for node.js to access Bol.com Open API service
Author:           Franklin (https://fvdm.com)
Source:           https://github.com/fvdm/nodejs-bolcom
License:          Unlicense
*/

const { doRequest } = require ('httpreq');

module.exports = class BolcomAPI {

  constructor ({
    apikey,
    sessionId = null,
    timeout = 5000,
  }) {
    this._config = {
      apikey,
      sessionId,
      timeout,
    };
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
   * Communication with API
   *
   * @param     {string}    cat       api.bol.com/:CAT/v4/method
   * @param     {string}    method    api.bol.com/cat/v4/:METHOD
   * @param     {object}    [params]  Request paramaters
   *
   * @return    {Promise<object>}
   */

  async _talk (cat, method, params = {}) {
    const options = {
      url: `https://api.bol.com/${cat}/v4/${method}`,
      method: 'GET',
      timeout: this._config.timeout,
      parameters: params,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'bolcom.js (https://www.npmjs.com/package/bolcom)',
      },
    };

    options.parameters.apikey = this._config.apikey;
    options.parameters.format = 'json';

    // check session ID
    if (this._config.sessionId) {
      options.headers['X-OpenAPI-Session-ID'] = this._config.sessionId;
    }

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
   * @return    {Promise<object>}
   */

  async ping () {
    return this._talk ('utils', 'ping');
  }


  /**
   * Generic catalog request handler
   *
   * @param     {string}    name      Catalog method name
   * @param     {object}    props     Request parameters
   *
   * @return    {Promise<object>}
   */

  async _catalogTalk (name, props) {
    const data = await this._talk ('catalog', name, props);

    if (Array.isArray (data.products)) {
      data.products.forEach (async (itm, i) => {
        data.products[i] = await this._cleanProduct (itm);
      });
    }

    return data;
  }


  /**
   * Method: catalog.search
   *
   * @param     {object}    props     Method parameters
   *
   * @return    {Promise<object>}
   */

  async catalogSearch (props) {
    return this._catalogTalk ('search', props);
  }


  /**
   * Method: catalog.lists
   *
   * @param     {object}    props     Method parameters
   *
   * @return    {Promise<object>}
   */

  async catalogLists (props) {
    return this._catalogTalk ('lists', props);
  }


  /**
   * Method: catalog.products
   *
   * @param     {string}    productId  Product ID
   * @param     {object}    [props]    Method parameters
   *
   * @return    {Promise<object>}
   */

  async catalogProducts (productId, props) {
    return this._catalogTalk (`products/${productId}`, props);
  }


  /**
   * Method: catalog.offers
   *
   * @param     {string}    productId  Product ID
   * @param     {object}    [props]    Method parameters
   *
   * @return    {Promise<object>}
   */

  async catalogOffers (productId, props) {
    return this._talk ('catalog', `offers/${productId}`, props)
      .then (data => data.offerData)
    ;
  }


  /**
   * Method: catalog.recommendations
   *
   * @return    {Promise<object>}
   *
   * @param     {string}    productId  Product ID
   * @param     {object}    [props]    Method parameters
   */

  async catalogRecommendations (productId, props) {
    return this._catalogTalk (`recommendations/${productId}`, props);
  }


  /**
   * Method: catalog.relatedproducts
   *
   * @return    {Promise<object>}
   *
   * @param     {string}    productId  Product ID
   * @param     {object}    [props]    Method parameters
   */

  async catalogRelatedProducts (productId, props) {
    return this._talk ('catalog', `relatedproducts/${productId}`, props);
  }

};
