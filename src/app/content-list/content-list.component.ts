import {Component, OnInit} from '@angular/core';
import { Content } from 'helper-files/content-interface';
import { HoverAffectDirective } from "../hover-affect.directive";
import {ContentTypeFilterPipe} from "src/app/type-filter.pipe";
import {CreateContentComponent} from "../create-content/create-content.component";

@Component({
  selector: 'app-content-list',
  template: `
    <div>
      <app-create-content (contentAdded)="onContentAdded($event)"></app-create-content>
      <ul>
        <li *ngFor="let content of filteredContents">
          {{content.id}} - {{content.title}} ({{content.description}})
        </li>
      </ul>
    </div>


    <div class="search-container">
      <input type="text" [(ngModel)]="searchTerm" placeholder="Enter content title">
      <button (click)="searchContents(searchTerm)">Search</button>
    </div>

    <h2>All Content</h2>
    <div class="content-list">
      <div *ngFor="let content of contents | contentTypeFilter">
        <app-content-card [content]="content" [ngClass]="content.type"></app-content-card>
      </div>
    </div>

    <h2>Filtered Content</h2>
    <div class="content-list">
      <div *ngIf="searchResults.length === 0">
        <p *ngIf="searchTerm && searchTerm.trim() !== ''">No content found with title '{{ searchTerm }}'</p>
      </div>
      <div *ngFor="let content of searchResults">
        <app-content-card [content]="content" [ngClass]="content.type"></app-content-card>
      </div>
    </div>

    <div *ngFor="let content of contents; let i = index" class="content-card" [style.border-width.px]="i === 0 ? 2 : 1" (click)="onImageClick(content)">
      <header>{{ content.title }}</header>
      <ng-container *ngIf="content.imgURL">
        <img [src]="content.imgURL" alt="{{ content.title }}" />
      </ng-container>
      <ng-container *ngIf="!content.imgURL">
        <img src="https://imgs.search.brave.com/E-ms5Ws7B822GVVK1FU_nQIHU6AicIMp9ose3HvkhNc/rs:fit:200:200:1/g:ce/aHR0cHM6Ly9jbGlw/Z3JvdW5kLmNvbS9p/bWFnZXMvYnVmZmVy/aW5nLXBuZy0xLnBu/Zw" alt="{{ content.title }}" />
      </ng-container>
      <div appHoverAffect [hoverStyle]="'background-color: #f0f0f0'" [unhoverStyle]="'none'">
        <p>{{ content.description }}</p>
      </div>
      <p>Creator: {{ content.creator }}</p>
      <div appHoverAffect [hoverStyle]="'underline'" [unhoverStyle]="'none'">
        <p>Type: {{ content.type }}</p>
      </div>
        <span appHoverAffect [hoverStyle]="'bold-text'" [unhoverStyle]="'normal'">
            <p>Tags: {{ content.tags }}</p>
        </span>
      </div>



  `,
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit{
  contents: Content[] = [
    {
      id: 1,
      title: 'World Of Warcraft',

      description: '(WoW) is a massively multiplayer online role-playing game (MMORPG) released in 2004 by Blizzard Entertainment',
      creator: 'William Petras,\n' +
        'Kevin Beardslee,\n' +
        'Justin Thavirat',
      type: 'type1',
      tags: ['Open World', 'Quests', 'PvP']
    },
    {
      id: 2,
      title: 'Sackboy',
      imgURL: 'https://imgs.search.brave.com/9oDzNucrY50vhcA5d1RpOF9x6vnGHiNhVnTCCsFcL3A/rs:fit:150:150:1/g:ce/aHR0cHM6Ly9hdmF0/YXJmaWxlcy5hbHBo/YWNvZGVycy5jb20v/MTQ4LzE0ODMuanBn',
      description: 'A Big Adventure is a 2020 platform game developed by Sumo Digital and published by Sony Interactive Entertainment',
      creator: 'Sony Interactive Entertainment',
      type: 'type2',
      tags: ['Objectives', 'PvE']
    },
    {
      id: 3,
      title: 'Apex Legends',
      imgURL: 'https://imgs.search.brave.com/i1b2uZIjQaEKWDf-87ke3aU89MxuRsDk0GIhX1B8Srg/rs:fit:150:150:1/g:ce/aHR0cHM6Ly9hdmF0/YXJmaWxlcy5hbHBo/YWNvZGVycy5jb20v/MjgxL3RodW1iLTI4/MTQyOC5wbmc',
      description: 'free-to-play battle royale-hero shooter game developed by Respawn Entertainment and published by Electronic',
      creator: 'Respawn Entertainment',
      type: 'type3',
      tags: ['FPP', 'Action']
    },
    {
      id: 4,
      title: 'Call of Duty: Modern Warfare II',
      imgURL: 'https://imgs.search.brave.com/jT9SSjKgP6tZr1Ak-XCq9FsdwIGASRMVMzEEpa-C4nU/rs:fit:200:200:1/g:ce/aHR0cHM6Ly9hdmF0/YXJmaWxlcy5hbHBo/YWNvZGVycy5jb20v/MTQxL3RodW1iLTE0/MTkyMy5qcGc',
      description: 'Call of Duty: Modern Warfare II is a 2022 first-person shooter game developed by Infinity Ward and published by Activision.',
      creator: 'Infinity Ward',
      type: 'type1',
      tags: ['FPP', 'PvP']
    },
    {
      id: 5,
      title: 'Raft',
      imgURL: 'https://i.imgur.com/PQi4gml.png',
      description: 'Raft is an open world survival video game developed by Swedish developer Redbeet Interactive, and published by Axolot Games.',
      creator: 'Redbeet Interactive',
      type: 'type3',
      tags: ['Survival', 'Open World']
    },
    {
      id: 6,
      title: 'The Last of Us',
      imgURL: 'https://imgs.search.brave.com/ScQe75cCy0QBgPP58NYyOTSWb0Z9VW3gAGcOmt8-CGM/rs:fit:184:184:1/g:ce/aHR0cHM6Ly9hdmF0/YXJmaWxlcy5hbHBo/YWNvZGVycy5jb20v/MTA5LzEwOTE3My5w/bmc',
      description: 'The Last of Us is a 2013 action-adventure game developed by Naughty Dog and published by Sony Computer Entertainment.',
      creator: 'Naughty Dog',
      type: 'type2',
      tags: ['PvE', 'Combat']
    },
    {
      id: 7,
      title: 'Hearthstone',
      imgURL: 'https://imgs.search.brave.com/O6Mif3PMt6K5tFXrmtkUraZhB-csvKqKgUKPq9ahFmE/rs:fit:150:150:1/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFlL2M3/Lzk4LzFlYzc5ODk1/NGY2NjViZWMzMzc4/YjE2OGNiNTM4NGE5/LmpwZw',
      description: 'Hearthstone is a free-to-play online digital collectible card game developed and published by Blizzard Entertainment.',
      creator: 'Blizzard Entertainment',
      type: 'type1',
      tags: ['Card Game', 'Abilities']
    }
  ];

  filteredContents: Content[] = this.contents;
  shouldUnderline = true;

  ngOnInit() {
  }

  filterContents(type?: string) {
    if (type) {
      this.filteredContents = this.contents.filter(content => content.type === type);
    } else {
      this.filteredContents = this.contents;
    }
  }


  searchResults: Content[] = [];
  searchTerm = '';
  errorMessage: string = '';
  orderValue = '';
  orderContents(order: string) {
    this.orderValue = order;
  }

  searchContents(searchTerm: string) {
    searchTerm = searchTerm.toLowerCase();
    this.filteredContents = this.contents.filter(content =>
      content.title.toLowerCase().includes(searchTerm) || content.description.toLowerCase().includes(searchTerm)
    );
  }

  onImageClick(content: Content) {
    console.log(`Clicked on content ${content.id}: ${content.title}`);
  }
  onContentAdded(newContent: Content) {
    this.contents.push(newContent);
    this.filteredContents = this.contents.filter(c => c.type === 'Blog');
  }
}

