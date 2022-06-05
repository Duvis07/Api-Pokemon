import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss'],
})
export class PokeTableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'image', 'name'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  pokemons = [];

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    let pokemonData: { position: number; image: any; name: any };

    for (let i = 1; i <= 150; i++) {
      this.pokemonService.getPokemons(i).subscribe(
        (res) => {
          pokemonData = {
            position: i,
            image: res.sprites.front_default,
            name: res.name,
          };

          this.data.push(pokemonData);
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  /**
   * Me filtra los pokemones
   *
   * @param event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRow(row: { position: any }) {
    //console.log(row);
    this.router.navigateByUrl(`/pokeDetail/${row.position}`);
  }
}
