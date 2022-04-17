import { promises as fs } from "fs";
import path from "path";

function getImagePath(imageName: string): string {
  return path.resolve(`./assets/full/${imageName}`);
}

function doesImageExist(imageName: string): Promise<boolean> {
  return fs
    .access(getImagePath(imageName))
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export { getImagePath, doesImageExist };
