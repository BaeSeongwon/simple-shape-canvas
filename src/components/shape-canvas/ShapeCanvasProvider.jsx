import { useState, useEffect, createContext } from "react";
import { LocalStorage } from "../../utils/web-storage";
import { Square, Circle } from "./shapes/core";
import { STORAGE_SAVE_KEY, DEFAULT_SELECTED_SHAPE } from "./config";

export const ShapeCanvasContext = createContext({
  selectedShapeType: "box",
  setSelectedShapeType: () => {},
  drawnShapeList: [],
  setDrawnShapeList: () => {},
  onClearDrawnShapeList: () => {},
  selectedShapeId: null,
  setSelectedShapeId: () => {},
  canvasBoundary: null,
  setCanvasBoundary: () => {},
  getShapeZindex: () => {},
  getMostTopZindex: () => {}
});

export default function ShapeCanvasProvider({children}) {
  const [ selectedShapeType, setSelectedShapeType ] = useState(DEFAULT_SELECTED_SHAPE);
  const [ drawnShapeList, _setDrawnShapeList ] = useState([]);
  const [ selectedShapeId, setSelectedShapeId ] = useState(null);
  const [ shapeZindex, setShapeZindex ] = useState(0);
  const [ canvasBoundary, setCanvasBoundary ] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  })

  useEffect(() => {
    const savedData = LocalStorage.get(STORAGE_SAVE_KEY, true);

    if(savedData) {
      setDrawnShapeList(savedData.map((item) => {
        let shape = null;
        if(item.type === "square") {
          shape = new Square();
          shape.setShapeInfo(item.width, item.height, item.border, item.position, item.left, item.top, item.borderRadius, item.zIndex);
        } else if(item.type === "circle") {
          shape = new Circle();
          shape.setShapeInfo(item.width, item.height, item.border, item.position, item.left, item.top, item.borderRadius, item.zIndex);
        }

        return shape;
      }));
    }
  }, []);

  useEffect(() => {
    if(drawnShapeList.length > 0) {
      const findMostTopZindexValue = drawnShapeList.reduce((acc, shape) => {
        if(shape.getZindex() > acc) {
          acc = shape.getZindex();
        }

        return acc;
      }, 0);

      if(findMostTopZindexValue > 0) {
        setShapeZindex(findMostTopZindexValue + 1);
      }
    }
  }, [drawnShapeList])

  const onClearDrawnShapeList = () => {
    LocalStorage.remove(STORAGE_SAVE_KEY);
    _setDrawnShapeList([]);
  }

  const getShapeZindex = () => {
    setShapeZindex(shapeZindex + 1);

    return shapeZindex;
  }

  const setDrawnShapeList = (shapeList) => {
    if(shapeList) {
      const shapeJsonList = shapeList.map(item => item.toJson());
      LocalStorage.set(STORAGE_SAVE_KEY, shapeJsonList);

      _setDrawnShapeList(shapeList);
    }
  }

  const getMostTopZindex = () => {
    return shapeZindex + 1;
  }

  return (
    <ShapeCanvasContext.Provider 
      value={{
        selectedShapeType, 
        setSelectedShapeType,
        drawnShapeList,
        setDrawnShapeList,
        onClearDrawnShapeList,
        selectedShapeId,
        setSelectedShapeId,
        canvasBoundary,
        setCanvasBoundary,
        getShapeZindex,
        getMostTopZindex
      }}
    >
      {children}
    </ShapeCanvasContext.Provider>
  )
}