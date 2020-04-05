export const fillAllFieldWithDefaultValue = <TObject, TDefaultValue>(
  obj: TObject,
  defaultValue: TDefaultValue
) => {
  Object.keys(obj).forEach((key: string) => {
    if ((obj as any)[key] == null) (obj as any)[key] = defaultValue;
  });
};

export const isEmpty = (obj: any) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const hasAny = (obj: any[]) => {
  if (obj == null) return false;
  if (obj.length > 0) return true;
  else return false;
};
