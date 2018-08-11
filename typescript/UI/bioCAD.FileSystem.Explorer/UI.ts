﻿/// <reference path="../../../javascript/linq.d.ts" />

// 在这里构建出用于显示文件的UI部分的代码

/**
 * 将文件呈现给用户的UI代码部分
*/
class FileHandle {

    public divId: string;
    /**
     * 目标文件的数据模型对象
    */
    public file: bioCADFile;
    public div: HTMLDivElement;

    public constructor(file: bioCADFile) {
        this.file = file;
    }

    static classNames: string[] = [
        "file-preview-frame",
        "krajee-default",
        "file-preview-initial",
        "file-sortable",
        "kv-preview-thumb"
    ];

    private footer(): string {
        return `<div class="file-footer-caption" title="${this.file.fileName}">
                    <div class="file-caption-info">${this.file.fileName}</div>
                    <div class="file-size-info">
                        <samp>(${this.file.size})</samp>
                    </div>
                </div>`;
    }

    private actionButtons(): string {
        return `<div class="file-actions">
                    <div class="file-footer-buttons">
                        <button type="button" 
                                class="kv-file-remove btn btn-sm btn-kv btn-default btn-outline-secondary" 
                                title="Delete file" 
                                data-url="/site/file-delete" 
                                data-key="11">

                            <i class="glyphicon glyphicon-trash">
                            </i>
                        </button>
                        <button type="button" class="kv-file-zoom btn btn-sm btn-kv btn-default btn-outline-secondary" title="View Details">
                            <i class="glyphicon glyphicon-zoom-in"></i>
                        </button>
                    </div>
                </div>`;
    }

    /**
     * @returns UI html string
    */
    public toString(): string {
        return `<div class="file-preview-frame krajee-default file-preview-initial file-sortable kv-preview-thumb" 
                     id="preview-1533958654820_64-init_0" 
                     data-fileindex="init_0" 
                     data-template="image"
                     title="${this.file.fileName}">

                    <div class="kv-file-content">
                        <div class="kv-preview-data file-preview-other-frame" style="width:auto;height:auto;max-width:100%;max-height:100%;">
                            <div class="file-preview-other">
                                <span class="file-other-icon">
                                    <i class="fa fa-file-photo-o text-danger"></i>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="file-thumbnail-footer">
                        ${this.footer()}
                        ${this.actionButtons()}

                        <div class="clearfix"></div>
                    </div>
                </div>`;
    }
}

const containerClassName: string = "file-preview-thumbnails";

/**
 * 文件浏览器的模型，这个对象是一个文件的集合
*/
class Explorer {

    public files: FileHandle[];
    public divId: string;
    public container: HTMLDivElement;

    public constructor(div: HTMLDivElement, files: FileHandle[]) {
        this.divId = div.id;
        this.files = files;
        this.container = div;
    }

    /**
     * @param divId 文件浏览器将会显示在这个div之中
    */
    public static show(divId: string, files: bioCADFile[], icons: Map<string, string>[] = null): Explorer {
        var div: HTMLDivElement = <HTMLDivElement>document.getElementById(divId);
        var fileHandles: IEnumerator<FileHandle> = From(files)
            .Select((file: bioCADFile) => {
                var handle: FileHandle = new FileHandle(file);
                return handle;
            });

        // 初始化容器div对象
        if (!div.classList.contains(containerClassName)) {
            div.classList.add(containerClassName);
        }
        div.innerHTML = fileHandles
            .Select(file => file.toString())
            .JoinBy("\n\n");

        return new Explorer(div, fileHandles.ToArray());
    }
}