export type ClassNameType = string | null | undefined;
export type ClassObject = { [className: string]: boolean };
export type ClassNameParam = ClassNameType | ClassObject;

export const joinClassObject = (object: ClassObject): string =>
  Object.keys(object)
    .filter((key) => object[key])
    .join(' ');

export const joinClasses = (firstClass: ClassNameParam, ...restClasses: Array<ClassNameType>): string => {
  const classes: Array<ClassNameParam> = [];
  if (Array.isArray(firstClass)) {
    classes.push(...firstClass);
  } else {
    classes.push(firstClass);
  }
  if (Array.isArray(restClasses)) {
    restClasses.forEach((restClass) => {
      if (Array.isArray(restClass)) {
        classes.push(...restClass);
      } else {
        classes.push(restClass);
      }
    });
  }

  // its an array off possible classes
  return (
    classes
      .map((clazz) => {
        //
        if (clazz !== null && typeof clazz === 'object') {
          return joinClassObject(clazz);
        }
        return clazz;
      })
      // filter all undefined stuff
      .filter((v) => !!v)
      .join(' ')
  );
};
