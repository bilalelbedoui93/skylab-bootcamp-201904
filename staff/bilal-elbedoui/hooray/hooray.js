'use strict';

/**
 * 
 */
function Hooray() {
    var first = arguments[0];

    if (arguments.length === 1 && typeof first === 'number')
        if (parseInt(first) !== first) throw RangeError('Invalid hooray');
        else return this.length = first;


    for (var i = 0; i < arguments.length; i++) this[i] = arguments[i];
    this.length = arguments.length;
}

/**
* Adds a value at the end of an hooray, incrementing its length by 1.
* 
* @param {*} value The value to push in the hooray.
* 
* @returns {number} The length of the hooray after adding the new value.
*/
Hooray.prototype.push = function (value) {
    if (arguments.length > 0)
        for (var i = 0; i < arguments.length; i++)
            this[this.length++] = arguments[i];

    return this.length;
}

/**
 * Iterates the current hooray and evaluates an expression on each of its values.
 * 
 * @param {Function} callback The expression to evaluate.
 */
Hooray.prototype.forEach = function (callback) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    var self = this;

    this.length && (function forEach(index) {
        callback(self[index], index);

        if (++index < self.length)
            forEach(index);
    })(0);
}
Hooray.prototype.isArray = function (value) {
    return (value instanceof Hooray);
}

Hooray.prototype.lastIndexOf=function(value){

    if(!(this instanceof Hooray)) throw TypeError('the first argument is not an array');

        for(var i=this.length;i>=0;i--){
            if(value===this[i]){
                return i;
            }      
        }
    return -1;
}

Hooray.prototype.filter=function(callback){

    if(typeof callback !== 'function') throw TypeError('the argument is not a function');
    
    var result=new Hooray();
    var positionResult=0
        for(var i=0;i<this.length;i++){
            if(callback(this[i])===true){
            result[positionResult]=this[i];
            positionResult++;
            result.length++;
            }
        }
        return result;
}   

Hooray.prototype.map=function(callback){

    if(typeof callback !== 'function') throw TypeError('the second argument should be a function');
  
      var newhooray=new Hooray();
      for(var i=0;i<this.length;i++){
       
       newhooray[i]=callback(this[i]);
       newhooray.length++;
      }
     return newhooray;
}

Hooray.prototype.concat=function (b){

    if(!(b instanceof Hooray)) throw TypeError("the second argument is not an array");
    
    var hooray=new Hooray();
    var self=this;
    for(var i=0;i<self.length;i++){
        hooray[i]=self[i];
        hooray.length++;
    }
    for(var j=0;j<b.length;j++){
        hooray[self.length+j]=b[j];
        hooray.length++;
    }
    return hooray;
}

Hooray.prototype.join=function(separate){
  
    var newString = '';

    if(arguments.length===1){
    
        for (var i = 0; i < this.length; i++){       
            newString = newString + this[i] + separate;  
        }
        return newString
    }else{
    
        for (var i = 0; i < this.length; i++){         
            newString = newString + this[i]+'';
        }
        return newString;
    }
}

Hooray.prototype.indexOf=function(value){

    if(typeof value === 'function') throw TypeError(value+' is a function');

    for(var i=0;i<this.length;i++){
        if(value===this[i]){
            return i;
        }
    }
    return -1;
}

Hooray.prototype.of=function(){
  
    var newhooray=new Hooray();
    for(var i=0;i<arguments.length;i++){
         if(typeof arguments[i]==='function'){
          throw TypeError('cannot introduce functions')
         }else{
          newhooray[i] = arguments[i];
          newhooray.length++;
         }
    }
  return newhooray;
}

Hooray.prototype.reverse=function(){

    var newhooray=new Hooray;
    var counter=0
  
    for(var i=this.length-1;i>=0;i--){
      if(typeof this[i]==='function'){
          throw TypeError('cannot introduce function in an array');
      }else{
        newhooray[counter]=this[i];
        counter++;
        newhooray.length++;   
      }
    }
    return newhooray;
}


Hooray.prototype.shift=function(){

  var removedvalue=this[0];
  for(var i=1;i<this.length;i++){
      this[i-1]=this[i];     
  }
  this.length=this.length-1;
  delete this[this.length];

  return removedvalue;   
}

Hooray.prototype.slice=function(positions){
   
    var newhooray=new Hooray;
    var counter=0;
    for(var i=0;i<arguments.length;i++){

        if(typeof arguments[i] ==='number'){
            if(arguments.length===1){
           
                for(var i=arguments[0];i<this.length;i++){
                newhooray[counter]=this[i];
                counter++;
                newhooray.length++;   
                }  
                return newhooray;
               
            }else if(arguments.length===2){
               
                for(var i=arguments[0];i<arguments[1];i++){
                newhooray[counter]=this[i];
                counter++; 
                newhooray.length++;     
                }  
                return newhooray;
               
            }else{ 
                return "Cannot introduce more than 2 arguments";     
            }
        }else{

            throw TypeError('accept just numbers as arguments');
        }
    }
}

Hooray.prototype.some=function(callback){
  
    var result;
    
    for(var i=0;i<this.length;i++){
          if(callback(this[i])){
              return true;
          }else{
              result= false;
          }
      }
    return result;
}


Hooray.prototype.pop=function(hooray){

    if (hooray.length) {
        var valueRemoved = hooray[hooray.length - 1];

        hooray.length--;
        delete hooray[hooray.length];

        return valueRemoved;
    }
}

Hooray.prototype.splice=function(inicio, numToEliminate, agregar1, agregar2){
    var newhooray = new Hooray;
    var n = 0;
    for (var i = 0; i <= this.length - 1; i++) {
  
        if (i < inicio) {
            newhooray[n] = this[i];
            n++;
            newhooray.length++;
        } else if (numToEliminate > 1) {
            numToEliminate--;     
        } else if (numToEliminate === 1){
           numToEliminate--;
          if (agregar1 !== 0 || agregar2 !== 0) {
            newhooray[n] = agregar1;
            n++;
            agregar1 = 0;
            newhooray.length++;

            if (agregar2 !== 0) {
                newhooray[n] = agregar2;
                n++;
                agregar2 = 0;
                newhooray.length++;
            } 
          }
        } else {
            newhooray[n] = this[i];
            n++;
            newhooray.length++;

        }
    } 
    return newhooray;

}



    

        

