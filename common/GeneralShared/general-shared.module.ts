import { FileUploadModule } from "ng2-file-upload";
//import { FileSelectDirective } from "ng2-file-upload";
import { NgModule } from "@angular/core";
import { ImagePreview } from "../../src/app/website/feed/image-preview.directive";

@NgModule({
  imports: [FileUploadModule],
  exports: [FileUploadModule, ImagePreview],
  declarations: [ImagePreview]
})
export class GeneralSharedModule {}
