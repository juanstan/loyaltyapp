import {Component, OnInit} from '@angular/core';
import {HistoryService} from '../../providers/history.service';
import {Observable} from 'rxjs/internal/Observable';
import {History} from '../../model/history';
import {User} from '../../model/user';
import {AccountService} from '../../providers/account.service';
import {snapshot} from '../../shared/utils/snapshot.util';
import {ProgramService} from '../../providers/program.service';
import {Program} from '../../model/program';
import {delay, finalize, tap} from 'rxjs/operators';
import {Currency} from '../../model/currency';

@Component({
  selector: 'page-initial',
  templateUrl: 'initial.html',
  styleUrls: ['./initial.scss'],
})
export class InitialPage implements OnInit {

  histories$: Observable<History[]>;
  program$: Observable<Program>;
  user: User;
  currencies: Currency[];
  loaded: boolean;

  constructor(
    private historyService: HistoryService,
    private accountService: AccountService,
    private programService: ProgramService
  ) {
    this.loaded = false;
    this.user = this.accountService.userValue;
  }

  ngOnInit() {
    this.histories$ = this.historyService.getHistoriesObservable();
    this.program$ = this.programService.getProgramObservable().pipe(tap(program => {
      this.currencies = program?.currencies;
    }));

  }

  checkCurrency(currency_id) {
    return this.currencies.find(currency => currency.id === currency_id)?.code;
  }


}
