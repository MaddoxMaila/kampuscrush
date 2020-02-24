// THERES A BUG HERE

      R.URLGridContent({url : '../api/posts/?context=5', callback : (response) => {

         let GridArray = [];

         response.posts.forEach((ExploreItem, index) => {

           R.ExploreList.push(new PostModel(ExploreItem));

            switch (R.ExploreList[index].getPost().type) {

               case 'image' :
               case 'photo' :

                  GridArray.push(UI.ImageBodyBuilder(R.ExploreList[index]));
                  break;
               case 'video' :

                  GridArray.push(UI.VideoBodyBuilder(R.ExploreList[index]));
                  break;
               case 'audio' :

                  GridArray.push(UI.AudioBodyBuilder(R.ExploreList[index]));
                  break;
               default :
                break;
              
            } // End Of Switch

         }); // End Of For Each

        UI.Grid({array : GridArray, gridMain : '.home-explore-body', gridItem : '.app-explore-grid-item', width : 1});

       } /* End Of CallBack*/})