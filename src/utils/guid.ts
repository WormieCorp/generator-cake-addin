export abstract class Guid {
  public static newGuid() {
    return "XXXXXXXX-XXXX-4XXX-YXXX-XXXXXXXXXXXX".replace(/[XY]/g, (c) => {
      // tslint:disable: no-bitwise
      const r = (Math.random() * 16) | 0;
      const v = c === "X" ? r : (r & 0x3) | 0x8;
      // tslint:enable: no-bitwise
      return v.toString(16).toUpperCase();
    });
  }
}
