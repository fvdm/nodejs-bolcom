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
          groups[group.title].attributes[attrib.key] = attrib;
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
  * Method: search suggestions
  *
  * @param   {object}  o
  *
  * @param   {string}  o.term  Search term (fuzzy)
  * @param   {string}  o.xcat  Product catagory
  *
  * @return  {Promise<array>}
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

    // Process JS response without unsafe eval()
    data = data.replace (/(,|\{)([^"]\w+[^"]):(\[|\{)/g, '$1"$2":$3');
    data = JSON.parse (data);

    // API error
    if (data.status) {
      const error = new Error (data.title);

      error.status = data.status;
      error.detail = data.type;

      throw error;
    }

    // Success
    return data.terms[1];
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
   * @param   {object}  props           Parameters
   * @param   {string}  props.endpoint  Catalog method name
   *
   * @return  {Promise<object>}
   */

  async _catalogTalk ({
    endpoint,
  }) {
    delete arguments[0].endpoint;

    const data = await this._talk ({
      endpoint: `/catalog/v4/${endpoint}`,
      parameters: arguments[0],
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
      endpoint: '/catalog/v4/lists',
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
   * Method: catalog offers
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
      endpoint: `/catalog/v4/offers/${productId}`,
      parameters: arguments[0],
    })
      .then (data => data.offerData)
    ;
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


  /**
   * Generate a link to add products to
   * the user's shopping basket.
   *
   * @param   {object}  offers     Items with amount: `{ id: amount }`
   * @param   {string}  [url]      Callback URL
   * @param   {string}  [name]     App name
   * @param   {number}  [siteId]   Partner site ID
   * @param   {number}  [logoId]   Partner logo ID
   * @param   {string}  [lang=en]  Language
   *
   * @return  {Promise<string>}
   */

  async addToBasket ({
    offers,
    url = '',
    name = '',
    siteId = '',
    logoId = '',
    lang = 'en',
  }) {
    let ids = [];

    for (let id in offers) {
      ids.push (id + ':' + offers[id]);
    }

    ids = ids.join (',');
    url = encodeURIComponent (url);

    return `https://afrekenen.bol.com/${lang}/winkelwagentje/direct-toevoegen`
      + `?returnurl=${url}&name=${name}&logoid=${logoId}`
      + `&id=${ids}&siteid=${siteId}`
    ;
  }

};
