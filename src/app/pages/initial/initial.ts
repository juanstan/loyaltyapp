import {Component, OnInit} from '@angular/core';
import {HistoryService} from '../../providers/history.service';
import {Observable} from 'rxjs/internal/Observable';
import {History} from '../../model/history';
import {User} from '../../model/user';
import {AccountService} from '../../providers/account.service';
import {snapshot} from '../../shared/utils/snapshot.util';
import {ProgramService} from '../../providers/program.service';
import {Program} from '../../model/program';

@Component({
  selector: 'page-initial',
  templateUrl: 'initial.html',
  styleUrls: ['./initial.scss'],
})
export class InitialPage implements OnInit {

  histories$: Observable<History[]>;
  program$: Observable<Program>;
  user: User;

  constructor(
    private historyService: HistoryService,
    private accountService: AccountService,
    private programService: ProgramService
  ) {
    this.user = this.accountService.userValue;
  }

  ngOnInit() {
    this.histories$ = this.historyService.getHistoriesObservable();
    this.program$ = this.programService.getProgramObservable();

  }


}
