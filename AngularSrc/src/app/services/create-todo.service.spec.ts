import { TestBed, inject } from '@angular/core/testing';

import { CreateTodoService } from './create-todo.service';

describe('CreateTodoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateTodoService]
    });
  });

  it('should be created', inject([CreateTodoService], (service: CreateTodoService) => {
    expect(service).toBeTruthy();
  }));
});
