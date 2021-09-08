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
  
  async cleanProductUrls (product) {
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
  
  async cleanProductImages (product) {
    let imgs = {};
    let image;
  
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
  
  async cleanProductAttrGroups (product) {
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
  
  async cleanProduct (product) {
    return cleanProductUrls (product)
      .then (cleanProductImages)
      .then (cleanProductAttrGroups)
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
        'User-Agent': 'bolcom.js (https://www.npmjs.com/package/bolcom)',
      },
    };

    options.parameters.apikey = this._config.apikey;
    options.parameters.format = 'json';
  
    // check session ID
    if (this._config.sessionId) {
      options.headers['X-OpenAPI-Session-ID'] = this._config.sessionId;
    }

    // process response
    return doRequest (options)
      .then (res => res.body)
      .then (JSON.parse)
    ;
  }
  
  
  /**
   * Method: utils.ping
   *
   * @return    {Promise<object>}
   */
  
  async methodUtilsPing () {
    return this._talk ('utils', 'ping');
  }
  
  
  /**
   * Method: account.sessions
   *
   * @return    {Promise<object>}
   */
  
  async methodAccountSessions () {
    return this._talk ('accounts', 'sessions');
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
  
    if (data.products && Array.isArray (data.products)) {
        for (let i = 0; i < data.products.length; i++) {
          data.products[i] = cleanProduct (data.products[i]);
        }
      }
  
      return data;
    }
  }
  
  
  /**
   * Method: catalog.search
   *
   * @param     {object}    props     Method parameters
   *
   * @return    {Promise<object>}
   */
  
  async methodCatalogSearch (props) {
    return this._catalogTalk ('search', props);
  }
  
  
  /**
   * Method: catalog.lists
   *
   * @param     {object}    props     Method parameters
   *
   * @return    {Promise<object>}
   */
  
  async methodCatalogLists (props) {
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
  
  async methodCatalogProducts (productId, props) {
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
  
  async methodCatalogOffers (productId, props) {
    const data = await this._talk ('catalog', `offers/${productId}`, props);
  
    if (data.offerData) {
      data = data.offerData;
    }
  
    return data;
  }
  
  
  /**
   * Method: catalog.recommendations
   *
   * @return    {Promise<object>}
   *
   * @param     {string}    productId  Product ID
   * @param     {object}    [props]    Method parameters
   */
  
  async methodCatalogRecommendations (productId, props) {
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
  
  async methodCatalogRelatedProducts (productId, props) {
    let data = await this._talk ('catalog', `relatedproducts/${productId}`, props);
    let tmp = {};
    let tmp2 = {};
  
    if (data.productFamilies) {
      data = data.productFamilies;
  
      if (!Array.isArray (data) && !data.length && !data[0].key) {
        return data;
      }
  
      for (let i = 0; i < data.length; i++) {
        tmp[data[i].key] = data[i];
  
        if (Array.isArray (data[i].productFamilyMembers)) {
          tmp2 = {};
  
          for (let m = 0; m < data[i].productFamilyMembers.length; m++) {
            tmp2[data[i].productFamilyMembers[m].label] = data[i].productFamilyMembers[m];
          }
  
          tmp[data[i].key].productFamilyMembers = tmp2;
        }
  
        data = tmp;
      }
  
      return data;
    }
  }
  
  
  /**
   * Method: account.wishlists
   *
   * @return    {Promise<object>}
   */
  
  async methodAccountWishlists () {
    return this._talk ('accounts', 'wishlists');
  }

};
