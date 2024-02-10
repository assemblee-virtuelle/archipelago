// organizations.mixin.js
const isObject = require('isobject');

/**
 * @description MoleculerJS mixin to be applied on the ControlledContainerMixin within a Semapps project.
 * Provides resource dereferencing after ldp.resource.get execution
 * 
 * @module MoleculerJS Mixin - Dereference
 * 
 * Features include:
 * - `get`: Retrieve a specific property from the main data.
 * - `dereference`: Recursively dereference properties from the main data.
 * - `handleAfterGet`: Post-retrieval result processing applying a dereferencing plan.
 * 
 * The mixin also introduces an `after.get` hook for automated processing following each retrieval action.
 * 
 * Usage:
 * This mixin requires the presence of an `ldp.resource.get` service within the MoleculerJS environment for 
 * effective LDP data interaction, emphasizing the need for a supportive ecosystem that includes necessary 
 * LDP resource management capabilities.
 * 
 * Example Configuration:
 * ```javascript
 * const settings = {
 *   dereferencePlan: [
 *     {
 *       "p": "http://schema.org/member",
 *       "n": [
 *         { "p": "http://schema.org/affiliation" }
 *       ]
 *     }
 *   ]
 * };
 * ```
 */
module.exports = {
    methods: {

        /**
        * Get a property from main data. This is a wrapper around ldp.resource.get to allow us to pass in the property to the API
        * 
        * @param ctx - moleculer context
        * @param mainData - The main data to get the property from
        * @param property - The property to get from mainData. It must be a property of mainData
        * 
        * @return { Promise } The result of the get operation as a JSON object with @context removed from the result
        */
        async get(ctx,mainData, property) {
            // Call the ldp.resource.get method to get the resource
            let result = await ctx.call(
                'ldp.resource.get',{resourceUri:mainData[property],accept:'application/ld+json'}
            );
            // Delete the context from the result
            delete(result['@context']);
            return result
        },

        /**
        * Dereferences properties from mainData according to propertiesSchema. This method is recursive so you can pass an array of propertiesSchema and it will dereference each element of the array to the result
        * 
        * @param ctx - moleculer context
        * @param mainData - The main data to dereference. Can be an array or an object.
        * @param propertiesSchema - The properties schema to dereference the mainData with.
        * 
        * @return { Promise } Resolves to the dereferenced data
        */
        async dereference(ctx,mainData, propertiesSchema) {
            if (Array.isArray(mainData)) {
                let result = [];
                for (var mainDataIteration of mainData) {
                    result.push(await this.dereference(ctx,mainDataIteration, propertiesSchema, depth))
                }
                return result;
            } else if (isObject(mainData)) {
                let resultData = {...mainData};
                let propertiesSchemaArray = [];
                if (!Array.isArray(propertiesSchema)) {
                    propertiesSchemaArray = [propertiesSchema];
                } else {
                    propertiesSchemaArray = [...propertiesSchema]
                }
        
                for (var propertySchema of propertiesSchemaArray) {
                    const property = propertySchema.p;
                    const reference = await this.get(ctx,mainData, property, true, depth);
                    if (propertySchema.n && reference != undefined) {
                        resultData[property] = await this.dereference(ctx,reference, propertySchema.n, depth + 1);
                    } else {
                        resultData[property] = reference;
                    }
                }
                return resultData;
            } else {
                return mainData;
            }
        },

        /**
        * Dereference and return the result after get. This is called after the result has been resolve thanks to ldp service
        * 
        * @param ctx - moleculer context
        * @param res - the result of the operation. It can be any type
        * 
        * @return { Promise } - the result of the operation or an error if there was a problem with the result
        */
        async handleAfterGet(ctx, res) {  
            const dereferencePlan = this.settings.dereferencePlan || [];
            const result = await this.dereference(ctx,res, dereferencePlan);
            return result;
        }
    },
    hooks: {
        // This hook is used to call the handleAfterGet method after the get method
        after: {
            "get": 'handleAfterGet'
        }
    }
};