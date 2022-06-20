import axios from 'axios'

class Publisher {
    constructor (url, headers) {
        this.instance = axios.create({
            baseURL: url,
            timeout: 1000,
            headers: headers
        })
    }

    post = async function(url,data) {
        console.log(url)
        this.instance.post(url, data).then(response => {return response.data }).catch(error => { console.log(error) })
    }

    patch = async function(url,data) {
        console.log(url)
        this.instance.patch(url, data).then(response => { return response.data }).catch(error => { console.log(error) })
    }

    get = async function(url) {
        console.log(url)
        var data = await this.instance.get(url).then(response => { return response.data }).catch(error => { console.log(error) })
        return data
    }

    delete = async function(url) {
         this.instance.delete(url).then(response => { return response.data }).catch(error => { console.log(error) }) 
    }

    formatEndPoint(entity, ids, properties, filters) {
        var endpoint = []
    
        // filters && !(filters.length) ? endpoint.push (this.formatFilters(filters)): ids ? endpoint.push (this.formatUrlIds(ids)): properties ? endpoint.push (this.formatProperties(properties)):'';
        properties ? endpoint.push(this.formatProperties(properties)): null;
        filters ? endpoint.push(this.formatFilters(filters)): null;
        if(ids) {
            Array.isArray(ids) ? endpoint.push(this.formatUrlIds(ids)): null;
        }
        console.log(ids);
        // var url = `/${entity}` + !Array.isArray(ids) && ids ? '/' + ids : ''
        // console.log(url);
        // url += `${ids||properties||filters?'?':''}${endpoint? endpoint.join('&'):''}` ?? ''
        // console.log(url);
        // console.log(`/${entity}${!Array.isArray(ids) ? '/' + ids : ''}/${ids||properties||filters?'?':''}${endpoint? endpoint.join('&'):''}`)
        return `/${entity}${ids && !Array.isArray(ids) ? '/' + ids : '/'}${ids && Array.isArray(ids)||properties||filters?'?':''}${endpoint? endpoint.join('&'):''}`
    }

    formatUrlIds(ids) {
        return  Array.isArray(ids) ? `${ids ? ids.map(id => `ids[]=${id}`).join('&'):''}`: ids; 
    }

    formatProperties(properties) {
        console.log(properties)
        return Array.isArray(properties) ? `${properties ? 'propertie[]='+ properties.map(prop => {console.log(prop); return prop}).join('&properties[]='):''}`: ''; 
    }

    formatFilters(filters) {
        // console.log(filters);
        // console.log('isArray'+Array.isArray(filters));
    //     filters.map((filter, key) =>  {
    //         console.log(filter);
    //         console.log(key);
    //         return key!== 'default' ? `${key}[]=${filter}` : filter ; 
    // }).join('&');

    // filters.forEach(function callback(value, index) {
    //     console.log(`${index}: ${value}`);
    //   })
        console.log(Object. entries(filters));
        var filters_temp = []

        for (const [key, filter] of Object.entries(filters)) {
            if(filter){
                filters_temp.push (key !== 'default' ? key == "name" ? `${key}=${filter}`: `${key}[]=${filter}` : filter)
            }
            // console.log(`${key}: ${filter}`);
            // console.log(filters_temp);
        }
        return filters_temp ? filters_temp.join('&'):''
    //     return filters ? Object.entries(filters).map((filter, key) =>  {
    //         // console.log(filter);
    //         // console.log(key);
    //         return key!== 'default' ? `${key}[]=${filter}` : filter ; 
    // }).join('&') : '';

// for (const [key, value] of Object.entries(object1)) {
//     console.log(`${key}: ${value}`);
//   }
}
}

export default Publisher;