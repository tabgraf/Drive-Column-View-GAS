/**
 * ------------------------------------------------------
 * Project: News Aggregator
 * Company: Tabgraf Technologies LLP
 * Website: https://tabgraf.com
 * Support Email: support@tabgraf.com
 * ------------------------------------------------------
 * Description:
 *   A Google Apps Script tool that aggregates news from multiple RSS feeds into a single Google Sheet.
 *
 * Author: Tabgraf Technologies LLP
 * License: [Your License Type, e.g., MIT, Apache 2.0]
 * ------------------------------------------------------
 */
var MY_DRIVE=[];
function doGet(e) {
  MY_DRIVE = getChildren(DriveApp.getRootFolder().getId(),-1).data;
  return HtmlService.createTemplateFromFile("Explorer").evaluate();
}

function getChildren(id,level){
  var data = [];
  
  var folders = DriveApp.getFolderById(id).getFolders();
  while(folders.hasNext()){
    var folder = folders.next();
    data.push({
      "type": 1,
      "id": folder.getId(),
      "level": level+1,
      "url": folder.getUrl(),
      "name": folder.getName(),
      "created": folder.getDateCreated().toLocaleString(),
      "updated": folder.getLastUpdated().toLocaleString()
    });
  }
  
  var files = DriveApp.getFolderById(id).getFiles();
  while(files.hasNext()){
    var file = files.next();
    data.push({
      "type": 0,
      "id": file.getId(),
      "url": file.getUrl(),
      "level": level+1,
      "created": file.getDateCreated().toLocaleString(),
      "updated": file.getLastUpdated().toLocaleString(),
      "name": file.getName()
    });
  }
  
  return {
    "id": id,
    "level": level,
    "data": data
  };
}
