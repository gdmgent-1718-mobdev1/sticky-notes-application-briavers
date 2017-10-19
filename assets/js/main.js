/***************
 * TODO
 * ============
 * remove the .location.reload() by something that isn't ugly
 * 
 * 
 * extra's
 * ==========
 * collor options
 * font options
 * 
 */





function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function(){
    
    var App = {
        "init": function() {

            this._applicationDbContext = ApplicationDbContext; // Reference to the ApplicationDbContext object
            this._applicationDbContext.init('ahs.nmd.stickynotes'); // Intialize the ApplicationDbContext with the connection string as parameter value
            if(this._applicationDbContext._dbData.stickynotes.length == 0 ){
                this.repair();
            }else{console.log("all is okay")};


           // this.testApplicationDbContext(); // Test DbContextµ
           //this.repair();
           this.showAllApplicationDbContext();
           //this.edditApplicationDbContext();
           this.AddOneStickkyNote();
           this.removeOneStickyNote();
           this.editOneStickyNote();
           this.hideOneNote();
           this.hideNone();
           
        },

        
        "repair":function(){
        let sn = new StickyNote();
        sn.message = 'Je aller eerste note (pls make sure there is always one).';
        sn = this._applicationDbContext.addStickyNote(sn); // add to db and save it
    },

        "showAllApplicationDbContext":function(){
            let stickyNoteElement = document.querySelector(".sticky_board")


            let data = this._applicationDbContext.getStickyNotes();
          //  console.log(data)
            data.forEach(function(element) {
                let tittle = element.id;
                let message = element.message;
                let createDate = element.createDate;
                let modifiedDate = element.modifiedDate;
                let deleteDate = element.deletedDate;
                
               if(deleteDate == null){

                
                let tempStr = ""

                tempStr += 
                `
                <div class ="note"> 
                <div class="sub-main">
                <button class="button-two" id="edit${tittle}"><span>edit</span></button>
                <button class="button-two" id="hide${tittle}"><span>hide</span></button>
                <button class="button-two" id="remove${tittle}"><span>delete</span></button>
                <p> ${message}  </p>
                <span class="tittle"> ${tittle}  </span>
                </div>
                `
                stickyNoteElement.innerHTML += tempStr;
               // console.log(message)
            } else{
                console.log("failed")
            }
                

            }, this);

        },
     
        "AddOneStickkyNote":function(){
            var self = this;
            var btnConfirm = document.getElementById('confirm');
            btnConfirm.onclick = function(){
                //console.log("clicked!!!!!")
    
               // console.log("Writing")
                let tempStr = ""
                tempStr +=  document.getElementById('messages').value;
                
            let sn = new StickyNote();
            sn.message = tempStr;
            sn = self._applicationDbContext.addStickyNote(sn); // add to db and save it
           
            location.reload();
            console.log('get this far')
            }

        },
        "removeOneStickyNote":function(){
            let self = this;
            let data = this._applicationDbContext.getStickyNotes();
            data.forEach(function(element) {
                var tittle = element.id;
                let deleteDate = element.deletedDate;
              //  console.log(tittle)

              if(deleteDate == null){
                
                btnDelete = document.getElementById(`remove${tittle}`)
                btnDelete.onclick=function(){
                    console.log('deleted' + tittle)
                    const deleted = self._applicationDbContext.deleteStickyNoteById(tittle);
                    location.reload();
                }
            } else{
                console.log("failed")
            }
                
            }, this);
           
        }, 
        "editOneStickyNote":function(){
            let self = this;
            let data = this._applicationDbContext.getStickyNotes();
            data.forEach(function(element) {
                let message = element.message
                var tittle = element.id;
                let deleteDate = element.deletedDate;
                console.log(message)
                console.log(tittle)
                btnEdit = document.getElementById(`edit${tittle}`)

                if(deleteDate == null){
                btnEdit.onclick=function(){
                    console.log('edited' + tittle)
                    element.message = prompt("Please enter the change", message);
                    const updated = self._applicationDbContext.updateStickyNote(element);
                    console.log(updated);
                    console.log(element);
                    location.reload();
                }
            } else{
                console.log("failed")
            }
                
            }, this);
           
        },     
        
        "hideOneNote":function(){
            let self = this;
            let data = this._applicationDbContext.getStickyNotes();
            data.forEach(function(element) {
                let deleteDate = element.deletedDate
                var tittle = element.id;
                if(deleteDate == null){   
                    btnHide = document.getElementById(`hide${tittle}`)
                    btnHide.onclick=function(){
                        console.log('hide' + tittle)
                        const softDeleted = self._applicationDbContext.softDeleteStickyNoteById(tittle);
                        location.reload();
                   // location.reload();
                    }
                } else{
                console.log("failed")
                }
                
            }, this);
           
        },  

        "hideNone":function(){
            let self = this;
            let data = this._applicationDbContext.getStickyNotes();
          
            btnShow = document.getElementById(`showAll`)
            btnShow.onclick=function(){
                data.forEach(function(element) {
                    var tittle = element.id;
                    const softUnDeleted = self._applicationDbContext.softUnDeleteStickyNoteById(tittle);
                    console.log(softUnDeleted);
                    location.reload();
                }, this);   
            }
        }, 
    };

    App.init(); // Initialize the application
});