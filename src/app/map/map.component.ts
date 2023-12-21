import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { IBlogs, IBlogsState } from '../blogs/blogs';
import { Store } from '@ngrx/store';
import { selectFetched } from '../blogs/blogs.selectors';
import { blogMarkerIcon } from './icon/icon';
import { Router } from '@angular/router';
import { map, distinctUntilChanged, catchError, of, Subscription } from 'rxjs';
import 'leaflet.markercluster';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {
  BASEMAP_URL,
  L_COORDINATE_MELBOURNE,
  MAP_MAX_ZOOM,
} from './util/constant';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit, OnDestroy {
  map: L.Map = {} as L.Map;

  options = {
    layers: [
      L.tileLayer(BASEMAP_URL, {
        maxZoom: MAP_MAX_ZOOM,
      }),
    ],
    zoom: 15,
    center: L_COORDINATE_MELBOURNE,
  };

  // blog marker cluster layer
  blogMarkerClusterGroupLayer: L.MarkerClusterGroup = L.markerClusterGroup();

  private router = inject(Router);
  private blogsStore = inject(Store<IBlogsState>);
  private subscription = new Subscription();

  blogs$ = this.blogsStore.select(selectFetched);

  ngOnInit() {
    console.log('component initialized');
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.map.remove();
  }

  onMapReady(map: L.Map) {
    console.log('map-icon ready', map);
    this.map = map;
    this.initializeMap();
  }

  initializeMap() {
    console.log('initialize map');
    // convert the blog to marker observables
    const markerClusterData$ = this.blogs$.pipe(
      map(blogs => this.transformBlogsToMarkers(blogs)),
      distinctUntilChanged(),
      catchError(error => {
        console.error('Error processing blog data:', error);
        return of([]);
      })
    );

    this.subscription.add(
      markerClusterData$.subscribe(markerData => {
        try {
          this.blogMarkerClusterGroupLayer.addLayers(markerData);
        } catch (error) {
          console.error('Error updating marker cluster:', error);
        }
      })
    );
  }

  transformBlogsToMarkers(blogs: IBlogs[]): L.Layer[] {
    return blogs.map(blog => {
      const popupContent = `
        <mat-card class="card">
            <mat-card-header class="card-title">${blog.title}</mat-card-header>
            <mat-card-content class="card-text">
                <p>${blog.content}</p>
                <button id="view-blog-${blog.id}" class="btn btn-primary">View</button>
            </mat-card-content>
        </mat-card>
        `;
      const blogMarker = L.marker(
        [blog.location?.lat ?? 0, blog.location?.lng ?? 0],
        {
          title: blog.title,
          riseOnHover: true,
          icon: blogMarkerIcon,
        }
      ).bindPopup(popupContent);

      // blogMarker.on('popupopen', () => {
      //   const button = document.getElementById(`view-blog-${blog.id}`);
      //   button?.addEventListener('click', async () => {
      //     await this.router.navigate(['/blog/list', blog.id]).then(r => r);
      //   });
      // });
      return blogMarker;
    });
  }
}
