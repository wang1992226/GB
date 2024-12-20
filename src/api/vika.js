import axios from "axios";

class BaseResource {
    constructor() {
        this.token = 'usk8PTxb3Rb46bYcLy3w4yi';
    }
    get_all(config = {}) {
        const filterByFormula = config.filterByFormula || '';
        // return `${this.ressourceName}.get_all()`;
        return axios.get(`${this.apiUrl}?filterByFormula=${filterByFormula}`, {headers: {Authorization: 'Bearer '+this.token}})
            .then((res) => {
                    // console.log(res.data.data)
                    if (res.data.code === 200 && res.data.data.total > 0) {
                        return res.data.data.records;
                    } else {
                        return []
                    }
                }
            )
    }
    add_data(data){
            axios.post(this.apiUrl, data, {headers: {Authorization: 'Bearer '+this.token}})
                .then((res) => {
                    console.log(res.data)
                })
    }
}

class 资源库任务 extends BaseResource {
    constructor() {
        super();
        this.ressourceName = '资源库任务';
        this.apiUrl = 'https://api.vika.cn/fusion/v1/datasheets/dstVdTZhRqYXou7gLz/records';
    }
    get_task() {
        return `${this.ressourceName}.get_task()`;
    }
}

class 资源库项目 extends BaseResource {
    constructor() {
        super();
        this.ressourceName = '资源库项目';
        this.apiUrl = 'https://api.vika.cn/fusion/v1/datasheets/dstK3lne0M9FVolG83/records';
    }
}
class 日志汇总 extends BaseResource {
    constructor() {
        super();
        this.ressourceName = '日志汇总';
        this.apiUrl = 'https://api.vika.cn/fusion/v1/datasheets/dstcgSP973ksHbQo1v/records';
    }
}
export {资源库任务, 资源库项目,日志汇总};






