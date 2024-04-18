export default class Loader {
  static loader: any;

  static setLoader = (loader: HTMLInputElement) => {
    this.loader = loader;
  };

  static showLoader = () => {
    this.loader.showLoader();
  };

  static hideLoader = () => {
    this.loader.hideLoader();
  };
}
