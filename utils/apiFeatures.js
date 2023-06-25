class ApiFeatures{
    constructor(mongooseQuery, queryString){
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
        this.page;
        this.totlalPages;
    }

    filter(){
        const queryStringObj ={...this.queryString} ;
        const excludesFeilds = ['page','limit','sort','keyword'];
        excludesFeilds.forEach((field)=> delete queryStringObj[field]);
        // filtering using gte|gt|lte|lt
        let queryStr= JSON.stringify(queryStringObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`);

        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));

        return this;
    }

    sort(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        }else{
            this.mongooseQuery = this.mongooseQuery.sort('createdAt');
        }

        return this;
    }

    search(){
        if(this.queryString.keyword){
            const query = {};
            query.$or = [
                {title: {$regex : this.queryString.keyword, $options:'i'}},
                {description: {$regex : this.queryString.keyword, $options:'i'}}
            ];
            this.mongooseQuery = this.mongooseQuery.find(query);
        }

        return this;
    }

    paginate(countDocuments){
        const page = this.queryString.page * 1 || 1; 
        const limit = this.queryString.limit * 1 || 5;
        const skip = (page - 1) * limit;

        this.totlalPages = 0;
        if ((countDocuments % limit) === 0) {
            this.totlalPages = countDocuments / limit;
        } else {
            this.totlalPages = Math.round((countDocuments / limit)) + 1;
        }

        this.page = page;
        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
       
        return this;
    }
}

module.exports = ApiFeatures;