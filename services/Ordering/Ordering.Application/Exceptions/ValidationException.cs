﻿using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ordering.Application.Exceptions;

public class ValidationException : ApplicationException
{
    public ValidationException() : base("One or more validation failures have occured")
    {
        Errors = new Dictionary<string, string[]>();
    }

    public ValidationException(IEnumerable<ValidationFailure> failures):this() 
    {
        Errors = failures.GroupBy(e=>e.PropertyName, e=>e.ErrorMessage)
            .ToDictionary(failuregroup=>failuregroup.Key,failuregroup=> failuregroup.ToArray());
    }

    public IDictionary<string, string[]> Errors { get;  }
}
