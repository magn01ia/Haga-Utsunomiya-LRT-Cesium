Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5N2UyMjcwOS00MDY1LTQxYjEtYjZjMy00YTU0ZTg5MmViYWQiLCJpZCI6ODAzMDYsImlhdCI6MTY0Mjc0ODI2MX0.dkwAL1CcljUV7NA7fDbhXXnmyZQU_c-G5zRx8PtEcxE";
const viewer = new Cesium.Viewer('cesiumContainer', {
  terrainProvider: new Cesium.CesiumTerrainProvider({
    url: Cesium.IonResource.fromAssetId(770371)
  }),
  animation: false,
  baseLayerPicker: false,
  fullscreenButton: false,
  geocoder: false,
  homeButton: false,
  navigationHelpButton: false,
  sceneModePicker: false,
  timeline: false,
  imageryProvider: new Cesium.UrlTemplateImageryProvider({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
    credit: '<a href="https://maps.gsi.go.jp/development/ichiran.html">地理院タイル</a>'
  })
});
Cesium.GeoJsonDataSource.clampToGround = true; 

const your_3d_tiles =viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
  url : 'https://assets.cms.plateau.reearth.io/assets/d2/7214a9-e4a1-427f-8d02-9abfbff75e05/09201_utsunomiya-shi_2020_3dtiles_3_op_bldg_lod1/tileset.json'
}
));

your_3d_tiles.style = new Cesium.Cesium3DTileStyle({
  color: {
    conditions: [
      ["Number(${計測高さ} )> 50", "color('#031cfc80')"],
      ["Number(${計測高さ} )> 25", "color('#5367fc80')"],
      ["Number(${計測高さ} )> 10", "color('#8d9afc80')"],
      ["Number(${計測高さ} )> 5", "color('#b5bcf780')"],
      ["true", "color('#e3fff380')"],   
    ],
  },
});

viewer.dataSources.add(Cesium.KmlDataSource.load("./data/kml/stops.kml",{clampToGround:true}));

const shapes = viewer.dataSources.add(Cesium.GeoJsonDataSource.load("./data/geojson/shapes.geojson",{
  stroke:Cesium.Color.GOLD,
  strokeWidth:4
}));

const br = viewer.dataSources.add(Cesium.GeoJsonDataSource.load("./data/geojson/br.geojson",{
  stroke:Cesium.Color.DARKTURQUOISE,
  strokeWidth:2
}));

const tr = viewer.dataSources.add(Cesium.GeoJsonDataSource.load("./data/geojson/tr.geojson",{
  stroke:Cesium.Color.DARKORANGE,
  strokeWidth:2
}));

const area = viewer.dataSources.add(Cesium.GeoJsonDataSource.load("./data/geojson/area.geojson",{
  stroke:Cesium.Color.GREENYELLOW,
  strokeWidth:3
}));


var pointDataSource = {
  "distancelabel": {url: "./data/geojson/bs.geojson", pic: "https://magn01ia.github.io/map_icon/png/pin.png", size: 0.15},
};
for (let key in pointDataSource) {
  let data = pointDataSource[key];
  Cesium.GeoJsonDataSource.load(data.url).then((dataSource) => {
    data.dataSource = dataSource;
    viewer.dataSources.add(dataSource).then(() => {
var entities = dataSource.entities.values;
      for (var i = 0; i < entities.length; i++) {
var entity = entities[i];
    entity.billboard.image = data.pic;
    entity.billboard.scale = data.size;
       }
     });
  })
;}


viewer.camera.setView({
  destination : Cesium.Cartesian3.fromDegrees(139.86, 36.54, 2000),
  orientation : {
    heading : Cesium.Math.toRadians(68),
    pitch : Cesium.Math.toRadians(-20),
  }
});

//const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());  