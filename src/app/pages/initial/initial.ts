import {Component, OnInit} from '@angular/core';
import {HistoryService} from '../../providers/history.service';
import {Observable} from 'rxjs/internal/Observable';
import {History} from '../../model/history';
import {User} from '../../model/user';
import {AccountService} from '../../providers/account.service';
import {snapshot} from '../../shared/utils/snapshot.util';

@Component({
  selector: 'page-initial',
  templateUrl: 'initial.html',
  styleUrls: ['./initial.scss'],
})
export class InitialPage implements OnInit {

  histories$: Observable<History[]>;
  user: User;

  constructor(
    private historyService: HistoryService,
    private accountService: AccountService
  ) {
    this.user = this.accountService.userValue;
  }

  ngOnInit() {
    this.histories$ = this.historyService.getHistoriesObservable();

  }


}
