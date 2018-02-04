/**
 * Created by Javid Sapand on 7/20/2017.
 */
import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  AfterViewInit,
  EventEmitter,
  Output
} from "@angular/core";

declare var SimpleMDE: any;

@Component({
  selector: "mdeditor",
  template: "<textarea #simplemde>{{text}}</textarea>"
})
export class SimpleMDEditor implements AfterViewInit {
  @Input() model: any;
  @Output() mdEditorChange = new EventEmitter<string>();
  @ViewChild("simplemde") textarea: ElementRef;
  @Input() text: string;
  resetEditor: boolean = false;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    const mdEditorChange = this.mdEditorChange;
    const mde = new SimpleMDE({
      element: this.textarea.nativeElement,
      forceSync: true,
      status: false,
      toolbar: [
        "bold",
        "italic",
        "heading",
        "|",
        "quote",
        "unordered-list",
        "ordered-list",
        "|",
        "link",
        "image",
        "code"
      ]
    });

    mde.codemirror.on("change", function() {
      const value = mde.codemirror.getValue();
      mdEditorChange.emit(value);
    });

    if (this.model) {
      mde.codemirror.setValue(this.model);
    }
  }

  public clearEditor() {
    console.log("called clear editor");
    this.resetEditor = true;
  }
}
