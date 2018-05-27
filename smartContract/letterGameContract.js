'use strict';

var Record = function(text){
    if(text){
        var obj = JSON.parse(text)
        this.address = obj.address
        this.point = obj.point
        this.timestamp = obj.timestamp
    } else {
        this.address = ''
        this.point = ''
        this.timestamp = this.getTimeStamp()
    }
} 

Record.prototype = {
    toString:function(){
        return JSON.stringify(this)
    },
    verifyAddress: function (address) {
        // 1-valid, 0-invalid
        var result = Blockchain.verifyAddress(address);
        return {
            valid: result == 0 ? false : true
        };
    },
    getTimeStamp(){
        return Blockchain.transaction.timestamp;
    }
}

var LetterGameContract = function(){
    LocalContractStorage.defineMapProperty(this,"records",{
        stringify:function(obj){
            return obj.toString()
        },
        parse:function(str){
            return new Record(str)
        }
    })
    LocalContractStorage.defineProperties(this,{
        topRank:{
            stringify:function(obj){
                return obj.toString()
            },
            parse:function(str){
                return new Record(str)
            }
        },
        adminAddress: null
    })
}

LetterGameContract.prototype = {
    init:function(){
        this.adminAdress = Blockchain.transaction.from;
    },
    getRecord:function(){
        var addr = Blockchain.transaction.from;
        var record = this.records.get(addr)
        if(record){
            return record
        } else {
            throw new Error({txt:'还没有记录',addr:addr})
        }
    },
    getTopRank:function(){
        var top = this.topRank
        if(top){
            return top
        } else {
            throw new Error('暂无排名')
        }
    },
    gameOver:function(point){
        var addr = Blockchain.transaction.from;
        var newRecord = new Record()
        newRecord.point = point
        newRecord.address = addr
        this._setRecord(newRecord)
        this._setTopRank(newRecord)


        var res1 = Blockchain.verifyAddress(addr);
        // var res2 = Blockchain.verifyAddress(this.adminAdress);

        return {record:this.records.get(addr),top:this.topRank,tt:'hahahah',addr:addr,res1:res1,addr1:this.adminAdress}
    },
    _setRecord:function(nRecord){
        var addr = nRecord.address
        var oRecord = this.records.get(addr)
        if(oRecord){
            if(parseInt(nRecord.point) > parseInt(oRecord.point)){
                this.records.set(addr,nRecord)
            }
        } else {
            this.records.set(addr,nRecord)
        }
    },
    _setTopRank:function(nRecord){
        var top = this.topRank
        if(top){
            if(parseInt(nRecord.point) > parseInt(top.point)){
                this.topRank = nRecord
            }
        } else {
            this.topRank = nRecord
        }
    }
}

module.exports = LetterGameContract;